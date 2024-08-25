import pymongo
import openai
import pytesseract
import re
from pymongo import MongoClient
from PIL import Image, UnidentifiedImageError
import requests
from io import BytesIO
from datetime import datetime, timedelta  # timedelta를 추가로 import

from dotenv import load_dotenv


client = pymongo.MongoClient('mongodb+srv://nanolaebmeta:skshfoqapxk2024!@cluster0.vydwyas.mongodb.net/nanolabmeta?retryWrites=true&w=majority&appName=Cluster0')
db = client['nanolabmeta']

two_years_ago = (datetime.now() - timedelta(days=2*365)).strftime('%Y-%m-%d')

# notice로 시작하는 모든 컬렉션 이름 가져오기
collection_names = [name for name in db.list_collection_names() if name.startswith('notices_')]

for collection_name in collection_names:
    collection = db[collection_name]

    # 기준이 되는 필드들 (예: title, date, link)
    pipeline = [
        {
            "$group": {
                "_id": {
                    "title": "$title",  # title과 date 기준으로 그룹화
                    "date": "$date"
                },
                "count": {"$sum": 1},
                "docs": {"$push": "$$ROOT"}
            }
        },
        {
            "$match": {
                "count": {"$gt": 1}  # 중복된 문서만 선택
            }
        }
    ]

    duplicates = collection.aggregate(pipeline)

    any_duplicates_found = False  # 중복이 발견되었는지 추적

    for duplicate in duplicates:
        any_duplicates_found = True
        print(f"Found duplicate documents in collection '{collection_name}':")
        for doc in duplicate['docs']:
            print(f"Document ID: {doc['_id']}, Title: {doc.get('title', 'Untitled')}, Date: {doc.get('date', 'N/A')}, Link: {doc.get('link', 'N/A')}")

        # 첫 번째 문서를 남겨두고 나머지 중복 문서를 제거
        ids_to_remove = [doc['_id'] for doc in duplicate['docs'][1:]]  # 첫 번째 문서 제외

        # 중복 문서 삭제
        result = collection.delete_many({"_id": {"$in": ids_to_remove}})
        print(f"Removed {result.deleted_count} duplicates from collection '{collection_name}'.\n")

    if not any_duplicates_found:
        print(f"No duplicates found in collection '{collection_name}'.\n")

    # 2년 전의 게시글 삭제
    # 2년 전의 게시글 삭제 (중요한 공지는 삭제하지 않음)
    delete_result = collection.delete_many({
    "date": {"$lt": two_years_ago},
    "type": {"$ne": "important"}  # type 필드가 important가 아닌 문서만 삭제
    })
    print(f"Removed {delete_result.deleted_count} documents older than {two_years_ago} from collection '{collection_name}'.\n")


print("Finished removing duplicates and old documents from all collections.")

load_dotenv()
# MongoDB 연결

openai_api_key = os.getenv('OPENAI_API_KEY')

if not openai_api_key:
    raise ValueError("OpenAI API key not found in environment variables.")

openai.api_key = openai_api_key




# 텍스트에서 날짜와 시간 추출 함수
def extract_deadline_from_text(text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Extract and provide the most important deadline with time from the following text in the format 'YYYY, M, D, H, M' (year, month, day, hour, minute)."},
            {"role": "user", "content": text},
        ]
    )
    deadline = response['choices'][0]['message']['content'].strip()
    return deadline

def extract_text_from_image(image_url):
    try:
        response = requests.get(image_url)
        response.raise_for_status()  # HTTP 오류 확인
        img = Image.open(BytesIO(response.content))
        text = pytesseract.image_to_string(img, lang='kor+eng')
        return text
    except (UnidentifiedImageError, requests.RequestException) as e:
        print(f"Error processing image: {e}")
        return ""

def parse_date_from_text(text):
    # 날짜와 시간 (YYYY, M, D, H, M) 형식의 추출
    date_time_pattern = re.compile(r'\b(\d{4})[,.년\s-]*(\d{1,2})[,.월\s-]*(\d{1,2})(?:[,.일\s-]*(\d{1,2})[:시\s]*(\d{1,2}))?\b')
    match = date_time_pattern.search(text)
    if match:
        return match.groups()
    return None

def process_collection(collection_name):
    collection = db[collection_name]
    
    # 2024-07-01 이후의 문서만 필터링
    notices = collection.find({'date': {'$gte': '2024-07-01'}})

    for doc in notices:
        extracted_text = doc.get('extractedText', '')
        deadline = extract_deadline_from_text(extracted_text)
        
        if 'images' in doc:
            for image_url in doc['images']:
                ocr_text = extract_text_from_image(image_url)
                if ocr_text:  # 빈 문자열이 아닌 경우에만 처리
                    ocr_deadline = extract_deadline_from_text(ocr_text)  # 이미지에서 추출한 텍스트도 OpenAI로 분석
                    
                    # OpenAI에서 추출한 마감일과 시간을 분석하여 날짜 형식으로 변환
                    ocr_parsed_date_time = parse_date_from_text(ocr_deadline)
                    
                    if ocr_parsed_date_time:
                        # 시간 정보가 없는 경우 기본값으로 00:00 사용
                        year, month, day = int(ocr_parsed_date_time[0]), int(ocr_parsed_date_time[1]), int(ocr_parsed_date_time[2])
                        hour = int(ocr_parsed_date_time[3]) if ocr_parsed_date_time[3] else 0
                        minute = int(ocr_parsed_date_time[4]) if ocr_parsed_date_time[4] else 0
                        
                        if deadline:
                            try:
                                deadline_date_time = datetime.strptime(deadline, '%Y, %m, %d, %H, %M')
                            except ValueError:
                                deadline_date_time = None
                        else:
                            deadline_date_time = None

                        ocr_date_time = datetime(year, month, day, hour, minute)
                        
                        # 더 중요한 날짜와 시간을 선택
                        if ocr_date_time > deadline_date_time:
                            deadline = f"{year}, {month}, {day}, {hour}, {minute}"
        
        # 문서에 'deadline' 필드 저장
        if deadline:
            collection.update_one({'_id': doc['_id']}, {'$set': {'deadline': deadline}})

def main():
    # notices_로 시작하는 모든 컬렉션 처리
    for collection_name in db.list_collection_names():
        if collection_name.startswith('notices_'):
            process_collection(collection_name)

if __name__ == "__main__":
    main()


import pymongo
import openai
import pytesseract
import re
from pymongo import MongoClient
from PIL import Image, UnidentifiedImageError
import requests
from io import BytesIO
from datetime import datetime


# MongoDB 연결
client = pymongo.MongoClient('mongodb+srv://nanolaebmeta:skshfoqapxk2024!@cluster0.vydwyas.mongodb.net/nanolabmeta?retryWrites=true&w=majority&appName=Cluster0')
db = client['nanolabmeta']

# 캐시를 위한 딕셔너리
response_cache = {}

# 텍스트 해시 생성 함수 (캐싱을 위해)
def extract_deadline_from_text(text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Extract and provide the most important deadline from the following text in the format 'YYYY, M, D'."},
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
    # YYYY, M, D 형식의 날짜 추출
    date_pattern = re.compile(r'\b(\d{4})[,.년\s-]*(\d{1,2})[,.월\s-]*(\d{1,2})\b')
    dates = date_pattern.findall(text)
    if dates:
        return max(dates, key=lambda x: datetime(int(x[0]), int(x[1]), int(x[2])))
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
                    ocr_deadline = extract_deadline_from_text(ocr_text)
                    ocr_parsed_date = parse_date_from_text(ocr_deadline)
                    
                    if ocr_parsed_date:
                        deadline_date = datetime.strptime(deadline, '%Y, %m, %d')
                        ocr_date = datetime(int(ocr_parsed_date[0]), int(ocr_parsed_date[1]), int(ocr_parsed_date[2]))
                        
                        # 더 중요한 날짜를 선택
                        if ocr_date > deadline_date:
                            deadline = f"{ocr_parsed_date[0]}, {ocr_parsed_date[1]}, {ocr_parsed_date[2]}"
        
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
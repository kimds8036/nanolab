import pymongo
import openai
import pytesseract
import re
from pymongo import MongoClient
from PIL import Image, UnidentifiedImageError
import requests
from io import BytesIO
from datetime import datetime, timedelta
import tempfile
import os
from dotenv import load_dotenv

# Tesseract 경로 설정
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# .env 파일에서 환경 변수 로드
load_dotenv()

# OpenAI API 키 설정
openai.api_key = os.getenv('OPENAI_API_KEY')

# MongoDB 연결
client = MongoClient(os.getenv('MONGO_URI'))
db = client['nanolabmeta']

# 기준 날짜 설정
two_years_ago = (datetime.now() - timedelta(days=2*365)).strftime('%Y-%m-%d')

# notice로 시작하는 모든 컬렉션 이름 가져오기
collection_names = [name for name in db.list_collection_names() if name.startswith('notices_')]

for collection_name in collection_names:
    collection = db[collection_name]

    # 중복 문서 제거
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

    for duplicate in duplicates:
        print(f"Found duplicate documents in collection '{collection_name}':")
        for doc in duplicate['docs'][1:]:
            print(f"Removing duplicate document with ID: {doc['_id']}")
            collection.delete_one({"_id": doc['_id']})

    # 2년 전의 게시글 삭제
    delete_result = collection.delete_many({
        "date": {"$lt": two_years_ago},
        "type": {"$ne": "important"}  # 중요하지 않은 문서만 삭제
    })
    print(f"Removed {delete_result.deleted_count} documents older than {two_years_ago} from collection '{collection_name}'.")

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

def process_image(image_url):
    try:
        response = requests.get(image_url, stream=True)
        response.raise_for_status()

        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_file:
            temp_file.write(response.content)
            temp_file_path = temp_file.name

        text = pytesseract.image_to_string(Image.open(temp_file_path), lang='kor+eng')
        os.remove(temp_file_path)
        return text

    except (requests.RequestException, UnidentifiedImageError) as e:
        print(f"Error processing image from {image_url}: {e}")
        return ""

def parse_date_from_text(text):
    date_time_pattern = re.compile(r'\b(\d{4})[,.년\s-]*(\d{1,2})[,.월\s-]*(\d{1,2})(?:[,.일\s-]*(\d{1,2})[:시\s]*(\d{1,2}))?\b')
    match = date_time_pattern.search(text)
    return match.groups() if match else None

def process_collection(collection_name):
    collection = db[collection_name]
    notices = collection.find({'date': {'$gte': '2024-07-01'}})

    for doc in notices:
        extracted_text = doc.get('extractedText', '')
        deadline = extract_deadline_from_text(extracted_text)

        if 'images' in doc:
            for image_url in doc['images']:
                ocr_text = process_image(image_url)
                if ocr_text:
                    ocr_deadline = extract_deadline_from_text(ocr_text)
                    ocr_parsed_date_time = parse_date_from_text(ocr_deadline)

                    if ocr_parsed_date_time:
                        year, month, day = int(ocr_parsed_date_time[0]), int(ocr_parsed_date_time[1]), int(ocr_parsed_date_time[2])
                        hour = int(ocr_parsed_date_time[3]) if ocr_parsed_date_time[3] else 0
                        minute = int(ocr_parsed_date_time[4]) if ocr_parsed_date_time[4] else 0

                        ocr_date_time = datetime(year, month, day, hour, minute)
                        deadline_date_time = datetime.strptime(deadline, '%Y, %m, %d, %H, %M') if deadline else None

                        if not deadline_date_time or ocr_date_time > deadline_date_time:
                            deadline = f"{year}, {month}, {day}, {hour}, {minute}"

        if deadline:
            collection.update_one({'_id': doc['_id']}, {'$set': {'deadline': deadline}})

def main():
    for collection_name in db.list_collection_names():
        if collection_name.startswith('notices_'):
            process_collection(collection_name)

if __name__ == "__main__":
    main()

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

dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path)

# Tesseract 경로 설정
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# .env 파일에서 환경 변수 로드
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
            {"role": "system", "content": "From the following text, prioritize extracting deadlines related to '접수기간', '신청기한', or similar terms indicating application periods. Extract the most important deadline in the format 'YYYY, M, D' (year, month, day)."},
            {"role": "user", "content": text},
        ]
    )
    deadline = response['choices'][0]['message']['content'].strip()
    
    # 날짜만 추출 (시간 제거)
    date_pattern = re.compile(r'(\d{4}),\s*(\d{1,2}),\s*(\d{1,2})')
    match = date_pattern.search(deadline)
    if match:
        year, month, day = match.groups()
        formatted_date = f"{year}-{int(month):02d}-{int(day):02d}"  # YYYY-MM-DD 형식으로 변환
        return formatted_date
    
    return None

def preprocess_vertical_text(ocr_text):
    lines = ocr_text.splitlines()
    processed_lines = []
    current_block = []

    for line in lines:
        stripped_line = line.strip()
        if stripped_line:
            current_block.append(stripped_line)
        else:
            if current_block:
                processed_lines.append(" ".join(current_block))
                current_block = []

    if current_block:
        processed_lines.append(" ".join(current_block))

    return "\n".join(processed_lines)

def process_image(image_url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Referer": "https://www.kku.ac.kr/"
    }
    
    try:
        response = requests.get(image_url, headers=headers, stream=True)
        response.raise_for_status()

        content_type = response.headers.get('Content-Type', '')
        if 'image' not in content_type:
            print(f"Invalid content type: {content_type} for URL: {image_url}")
            return ""

        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_file:
            temp_file.write(response.content)
            temp_file_path = temp_file.name

        raw_text = pytesseract.image_to_string(Image.open(temp_file_path), lang='kor+eng')

        processed_text = preprocess_vertical_text(raw_text)

        os.remove(temp_file_path)

        return processed_text

    except (requests.RequestException, UnidentifiedImageError) as e:
        print(f"Error processing image from {image_url}: {e}")
        return ""

def process_collection_images(collection_name):
    collection = db[collection_name]
    
    notices = collection.find({'date': {'$gte': '2024-08-01'}})

    for doc in notices:
        deadline = None
        extracted_text = doc.get('extractedText', '')

        if extracted_text:
            print(f"Extracted text from document ID {doc['_id']}: {extracted_text[:100]}...")
            deadline = extract_deadline_from_text(extracted_text)

        if not deadline and 'images' in doc:
            for image_url in doc['images']:
                ocr_text = process_image(image_url)
                if ocr_text:
                    print(f"OCR text from image URL {image_url}: {ocr_text[:100]}...")
                    deadline = extract_deadline_from_text(ocr_text)
                    if deadline:
                        break

        if deadline:
            print(f"Document ID {doc['_id']} will be updated with new deadline: {deadline}")
            collection.update_one({'_id': doc['_id']}, {'$set': {'deadline': deadline}})
        else:
            print(f"No deadline found for document ID {doc['_id']}")

def main():
    for collection_name in db.list_collection_names():
        if collection_name.startswith('notices_'):
            process_collection_images(collection_name)

if __name__ == "__main__":
    main()

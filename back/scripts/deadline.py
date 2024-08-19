import openai
import pymongo
from datetime import datetime
import hashlib
import pytesseract
from PIL import Image, UnidentifiedImageError
import requests
from io import BytesIO

# OpenAI API 키 설정


# MongoDB 연결
client = pymongo.MongoClient('mongodb+srv://nanolaebmeta:skshfoqapxk2024!@cluster0.vydwyas.mongodb.net/nanolabmeta?retryWrites=true&w=majority&appName=Cluster0')
db = client['nanolabmeta']

# 캐시를 위한 딕셔너리
response_cache = {}

# 텍스트 해시 생성 함수 (캐싱을 위해)
def generate_text_hash(text):
    return hashlib.md5(text.encode()).hexdigest()

# 이미지에서 텍스트를 추출하는 함수
def extract_text_from_image(image_url):
    try:
        # 이미지 다운로드
        response = requests.get(image_url)
        image = Image.open(BytesIO(response.content))
        image.verify()  # 이미지 검증
        image = Image.open(BytesIO(response.content))  # 이미지 다시 열기 (verify 이후 사용)
        
        # OCR을 통해 텍스트 추출
        extracted_text = pytesseract.image_to_string(image, lang='kor+eng')
        print(f"Extracted text from image {image_url}: {extracted_text}")  # 로그에 텍스트 출력
        return extracted_text
    except UnidentifiedImageError:
        print(f"Error: Unrecognized image format for image {image_url}")
        return ""
    except Exception as e:
        print(f"Error extracting text from image {image_url}: {e}")
        return ""

# 날짜 정규화 함수
def normalize_date(date_string):
    try:
        normalized_date = datetime.strptime(date_string, '%Y. %m. %d').strftime('%Y. %m. %d')
        return normalized_date
    except ValueError:
        pass
    
    try:
        normalized_date = datetime.strptime(date_string, '%Y. %m. %d at %H:%M').strftime('%Y. %m. %d at %H:%M')
        return normalized_date
    except ValueError:
        pass
    
    return date_string  # 정규화 실패 시 원본 반환

# 카테고리 목록
categories = [
    '외부행사/공모전', '학사공지', '장학공지', '취업/창업공지', '국제/교류공지',
    '일반공지', '채용공지', '신문방송학과', '동화.한국어문화학과', '영어문화학과', '패션디자인학과',
    '산업디자인학과','시각영상디자인학과','실내디자인학과','경영학과','경제통상학과','경찰학과','소방방재융합학과','문헌정보학과',
    '유아교육과','사회복지학과','메카트로닉스공학과','컴퓨터공학과','바이오메디컬공학과','녹색기술융합학과',
    '에너지신소재공학과','바이오의약학과','생명공학학과','식품영양학과','스포츠건강학과','골프산업학과','의예과','혁신공유대학'
]

# 기준 날짜 설정
cutoff_date = datetime(2024, 7, 1)

# 각 카테고리에 대해 처리
for category in categories:
    collection_name = f'notices_{category}'
    collection = db[collection_name]

    # 2024-07-01 이후의 데이터를 필터링
    notices = collection.find({'date': {'$gte': '2024-07-01'}})

    for notice in notices:
        extracted_text = notice.get('extractedText', '')
        image_urls = notice.get('images', [])

        # 이미지에서 텍스트 추출 및 추가
        for image_url in image_urls:
            image_text = extract_text_from_image(image_url)
            if image_text:  # 유효한 텍스트가 있는 경우에만 추가
                extracted_text += "\n" + image_text

        # 캐싱된 응답이 있는지 확인
        text_hash = generate_text_hash(extracted_text)
        if text_hash in response_cache:
            extracted_date_text = response_cache[text_hash]
        else:
            # OpenAI API 호출을 위한 메시지 구성
            messages = []
            if "마감기한" in extracted_text or "모집기간" in extracted_text or "신청기한" in extracted_text:
                messages.append(
                    {"role": "system", "content": "Extract and normalize the final submission date from the following text. Return only the date in 'YYYY. MM. DD' format, or if time is included, use 'YYYY. MM. DD at HH:MM' format."}
                )
                messages.append(
                    {"role": "user", "content": extracted_text}
                )
            else:
                # 만약 본문에 해당 키워드가 없다면 이미지에서 추출한 텍스트를 추가
                if any("마감기한" in image_text or "모집기간" in image_text or "신청기한" in image_text for image_text in image_urls):
                    for image_text in image_urls:
                        messages.append(
                            {"role": "user", "content": image_text}
                        )
                
                # 메시지에 아무 것도 추가되지 않은 경우 빈 값으로 남김
                if not messages:
                    extracted_date_text = "N/A"  # 추출된 기한이 없는 경우 "N/A"로 설정
                    continue

            # 메시지가 있으면 OpenAI API 호출
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            print("API 응답:", response)
            
            # OpenAI 응답에서 추출된 날짜 가져오기
            deadline_text = response['choices'][0]['message']['content'].strip()
            extracted_date_text = normalize_date(deadline_text)
            print("추출된 마감일:", extracted_date_text)
            # 캐시에 응답 저장
            response_cache[text_hash] = extracted_date_text

        # MongoDB에 deadline 필드 업데이트
        collection.update_one(
            {'_id': notice['_id']},
            {'$set': {'deadline': extracted_date_text}}
        )
        
        print(f"Updated deadline for notice in {collection_name} with ID: {notice['_id']}")

print("All deadlines have been extracted and updated.")

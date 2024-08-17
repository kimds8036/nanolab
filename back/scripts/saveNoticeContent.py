import requests
import time
from bs4 import BeautifulSoup, Comment
from pymongo import MongoClient
from urllib.parse import urljoin

# Clean content by removing comments and unwanted tags
def clean_content(soup, element):
    for comment in soup.findAll(text=lambda text: isinstance(text, Comment)):
        comment.extract()

    html_content = element.decode_contents()
    html_content = html_content.replace('<!--[if[^>]*>[\s\S]*?<![endif]-->', '').replace('<!--[data-hwpjson][\s\S]*?-->', '').replace('\n', '')
    element.clear()
    element.append(BeautifulSoup(html_content, 'html.parser'))

    allowed_tags = {'p', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'span', 'div', 'a', 'br', 'strong', 'img','h'}
    for tag in element.find_all(True):
        if tag.name not in allowed_tags:
            tag.unwrap()

# Connect to MongoDB
def connect_to_mongodb():
    try:
        print("Attempting to connect to MongoDB...")
        client = MongoClient('mongodb+srv://nanolaebmeta:skshfoqapxk2024!@cluster0.vydwyas.mongodb.net/nanolabmeta?retryWrites=true&w=majority&appName=Cluster0')
        db = client['nanolabmeta']
        print('Successfully connected to MongoDB')
        return db
    except Exception as e:
        print('Error connecting to MongoDB:', e)
        exit(1)

# Define schema and model for notice links
def get_notice_links(db):
    cursor = db.noticelinks.find()
    notice_links_list = list(cursor)
    print(f"Number of notice links found: {len(notice_links_list)}")
    return notice_links_list

# Save or update notice in the database
def save_or_update_notice(db, category, notice_data):
    try:
        collection_name = f'notices_{category}'
        collection = db[collection_name]
        collection.update_one(
            {'title': notice_data['title'], 'date': notice_data['date']},
            {'$set': notice_data},
            upsert=True
        )
        print(f"Notice saved or updated in {collection_name}: {notice_data['title']}")
    except Exception as e:
        print('Error saving or updating notice in category collection:', e)

# Extract file URLs
def extract_files(soup, collection_name, base_url, db):
    files = []
    notice = db[collection_name].find_one({})

    if notice:
        for element in soup.select('a[href*="/common/downLoad.do"]'):
            href_value = element['href']
            file_url = urljoin(base_url, href_value)
            files.append(file_url)

    return files

categories = [
    {'name': '신문방송학과', 'baseUrl': 'https://masscom.kku.ac.kr', 'type': 'second'},
    {'name': '학사공지', 'baseUrl': 'https://m.kku.ac.kr', 'type': 'first'},
    {'name': '장학공지', 'baseUrl': 'https://m.kku.ac.kr', 'type': 'first'},
    {'name': '취업/창업공지', 'baseUrl': 'https://m.kku.ac.kr', 'type': 'first'},
    {'name': '국제/교류공지', 'baseUrl': 'https://m.kku.ac.kr', 'type': 'first'},
    {'name': '일반공지', 'baseUrl': 'https://m.kku.ac.kr', 'type': 'first'},
    {'name': '채용공지', 'baseUrl': 'https://m.kku.ac.kr', 'type': 'first'},
    {'name': '외부행사/공모전', 'baseUrl': 'https://m.kku.ac.kr', 'type': 'first'},
    {'name': '동화.한국어문화학과', 'baseUrl': 'https://dongwha.kku.ac.kr', 'type': 'second'},
    {'name': '영어문화학과', 'baseUrl': 'https://kuell.kku.ac.kr', 'type': 'second'},
    {'name': '패션디자인학과', 'baseUrl': 'https://fashion.kku.ac.kr', 'type': 'second'},
    {'name': '뷰티화장품학과', 'baseUrl': 'https://beauty.kku.ac.kr', 'type': 'second'},
    {'name': '산업디자인학과', 'baseUrl': 'https://kkuid.kku.ac.kr', 'type': 'second'},
    {'name': '시각영상디자인학과', 'baseUrl': 'https://visualad.kku.ac.kr', 'type': 'second'},
    {'name': '실내디자인학과', 'baseUrl': 'https://interior.kku.ac.kr', 'type': 'second'},
    {'name': '경영학과', 'baseUrl': 'https://biz.kku.ac.kr', 'type': 'second'},
    {'name': '경제통상학과', 'baseUrl': 'https://trade.kku.ac.kr', 'type': 'second'},
    {'name': '경찰학과', 'baseUrl': 'https://police.kku.ac.kr', 'type': 'second'},
    {'name': '소방방재융합학과', 'baseUrl': 'https://fire.kku.ac.kr', 'type': 'second'},
    {'name': '문헌정보학과', 'baseUrl': 'https://lis.kku.ac.kr', 'type': 'second'},
    {'name': '유아교육과', 'baseUrl': 'https://ece.kku.ac.kr', 'type': 'second'},
    {'name': '사회복지학과', 'baseUrl': 'https://sw.kku.ac.kr', 'type': 'second'},
    {'name': '메카트로닉스공학과', 'baseUrl': 'https://mechatronics.kku.ac.kr', 'type': 'second'},
    {'name': '컴퓨터공학과', 'baseUrl': 'https://cs.kku.ac.kr', 'type': 'second'},
    {'name': '바이오메디컬공학과', 'baseUrl': 'https://kkubme.kku.ac.kr', 'type': 'second'},
    {'name': '녹색기술융합학과', 'baseUrl': 'https://greentech.kku.ac.kr', 'type': 'second'},
    {'name': '에너지신소재공학과', 'baseUrl': 'https://chemistry.kku.ac.kr', 'type': 'second'},
    {'name': '바이오의약학과', 'baseUrl': 'https://biomedchem.kku.ac.kr', 'type': 'second'},
    {'name': '생명공학학과', 'baseUrl': 'https://biotech.kku.ac.kr', 'type': 'second'},
    {'name': '식품영양학과', 'baseUrl': 'https://foodbio.kku.ac.kr', 'type': 'second'},
    {'name': '스포츠건강학과', 'baseUrl': 'https://sports.kku.ac.kr', 'type': 'second'},
    {'name': '골프산업학과', 'baseUrl': 'https://golf.kku.ac.kr', 'type': 'second'},
    {'name': '의예과', 'baseUrl': 'https://medicine.kku.ac.kr', 'type': 'second'},
    {'name': '혁신공유대학', 'baseUrl': 'https://healingbio.kku.ac.kr', 'type': 'second'}
]

# ... (이전 코드 생략)

def scrape_and_save_notices():
    db = connect_to_mongodb()

    print("Fetching notice links...")
    notice_links = get_notice_links(db)  # 커서를 리스트로 변환하여 한 번에 가져오기
    print(f"Fetched {len(notice_links)} notice links.")

    for notice_link in notice_links:
        print(f"Processing link: {notice_link['link']}")
        link = notice_link['link']
        category = notice_link['category']
        notice_data = None

        # 카테고리 매칭
        matching_category = next((c for c in categories if c['name'] == category), None)
        if not matching_category:
            print(f'Unrecognized category: {category}')
            continue

        start_time = time.time()
        try:
            response = requests.get(link)
            soup = BeautifulSoup(response.text, 'html.parser')

            if matching_category['type'] == 'first':
                title = soup.select_one('h4').get_text(strip=True).replace('제목\t :', '').strip() or '제목 없음'
                date = soup.select_one('span.detail_info_date + span.detail_info_after').get_text(strip=True) or '날짜 없음'
                views = soup.select_one('span.detail_info_hit + span.detail_info_after').get_text(strip=True) or '조회수 없음'
                content_element = soup.select_one('#board_contents')

            elif matching_category['type'] == 'second':
                title = soup.select_one('table.grid .subject').get_text(strip=True) or '제목 없음'
                date = soup.select_one('table.grid th:contains("작성일") + td').get_text(strip=True) or '날짜 없음'
                views = soup.select_one('table.grid th:contains("조회수") + td').get_text(strip=True) or '조회수 없음'
                content_element = soup.select_one('#post_view_txt')

            if content_element:
                clean_content(soup, content_element)
                content = str(content_element) or '내용 없음'
                extracted_text = content_element.get_text(strip=True)
                
                # PDF 파일 링크 추출 및 본문에 포함
                pdf_url = None
                iframe_element = content_element.select_one('iframe')
                if iframe_element:
                    pdf_url = urljoin(link, iframe_element['src'])
                    content = content.replace(str(iframe_element), f'<a href="{pdf_url}">View PDF</a>')
                
                # 본문에 포함된 링크 필터링 (가짜 링크 제거)
                valid_links = []
                for a_tag in content_element.find_all('a', href=True):
                    if not a_tag['href'].startswith('file://'):
                        valid_links.append(a_tag['href'])

                # 이미지 URL 추출
                image_urls = [img['src'] for img in content_element.find_all('img')]

            else:
                content = '내용 없음'
                extracted_text = '내용 없음'
                valid_links = []
                image_urls = []
                pdf_url = None

            # 첨부 파일 추출
            all_files = []
            file_elements = soup.select('td[colspan="3"] .addfile a')
            for file_element in file_elements:
                file_url = urljoin(matching_category['baseUrl'], file_element['href'])
                all_files.append(file_url)

            result = {
                'title': title,
                'date': date,
                'views': views,
                'content': content,
                'files': all_files,
                'extractedText': extracted_text,
                'images': image_urls,
                'links': valid_links,
                'pdfUrl': pdf_url  # PDF 파일 URL 저장
            }
            print(f"Processed notice: {result}")

        except Exception as e:
            print(f'Error scraping notice content for category {category}:', e)

        elapsed_time = time.time() - start_time
        print(f"Time taken to fetch and process page for {category}: {elapsed_time} seconds")

        save_or_update_notice(db, category, result)

    db.client.close()

# 스크립트 실행
if __name__ == "__main__":
    try:
        scrape_and_save_notices()
    except Exception as e:
        print(f"An error occurred: {e}")
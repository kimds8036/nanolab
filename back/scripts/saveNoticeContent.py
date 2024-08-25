import requests
import time
from bs4 import BeautifulSoup, Comment
from pymongo import MongoClient
from urllib.parse import urljoin
from datetime import datetime

# User-Agent 설정
headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; Yeti/1.0; +http://naver.me/bot)'
}

# HTML 컨텐츠 정리 함수
def clean_content(soup, element):
    for comment in soup.findAll(text=lambda text: isinstance(text, Comment)):
        comment.extract()

    html_content = element.decode_contents()
    html_content = html_content.replace('<!--[if[^>]*>[\s\S]*?<![endif]-->', '').replace('<!--[data-hwpjson][\s\S]*?-->', '').replace('\n', '')
    element.clear()
    element.append(BeautifulSoup(html_content, 'html.parser'))

    allowed_tags = {'p', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'span', 'div', 'a', 'br', 'strong', 'img', 'h', 'i', 'iframe'}
    for tag in element.find_all(True):
        if tag.name not in allowed_tags:
            tag.unwrap()

# MongoDB 연결 함수
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

# 공지사항 링크 가져오기
def get_notice_links(db):
    cursor = db.noticelinks.find()
    notice_links_list = list(cursor)
    print(f"Number of notice links found: {len(notice_links_list)}")
    return notice_links_list

# 공지사항 저장 및 업데이트
def save_or_update_notice(db, category, notice_data):
    try:
        collection_name = f'notices_{category}'
        print(f"Saving to collection: {collection_name}")
        collection = db[collection_name]
        existing_notice = collection.find_one({'title': notice_data['title'], 'date': notice_data['date']})
        if existing_notice:
            print(f"Notice already exists in {collection_name}: {notice_data['title']}")
            return
        collection.update_one(
            {'title': notice_data['title'], 'date': notice_data['date']},
            {'$set': notice_data},
            upsert=True
        )
        print(f"Notice saved or updated in {collection_name}: {notice_data['title']}")
    except Exception as e:
        print('Error saving or updating notice in category collection:', e)



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


def get_latest_notice_date(db, category):
    # 카테고리별로 가장 최근에 저장된 공지사항 날짜 가져오기
    collection_name = f'notices_{category}'
    collection = db[collection_name]
    latest_notice = collection.find_one(sort=[("date", pymongo.DESCENDING)])
    return latest_notice['date'] if latest_notice else '1970-01-01'
# 공지사항 크롤링 및 저장
def scrape_and_save_notices():
    db = connect_to_mongodb()

    print("Fetching notice links...")
    notice_links = get_notice_links(db)
    print(f"Fetched {len(notice_links)} notice links.")

    for notice_link in notice_links:
        print(f"Processing link: {notice_link['link']}")
        link = notice_link['link']
        category = notice_link['category']
        result = None  # 초기화

        # 카테고리 매칭
        matching_category = next((c for c in categories if c['name'] == category), None)
        if not matching_category:
            print(f'Unrecognized category: {category}')
            continue

        latest_date = get_latest_notice_date(db, category)
        notice_date = datetime.strptime(notice_link['date'], "%Y-%m-%d")

        # 이전에 저장된 공지사항 이후의 것만 처리
        if notice_date <= datetime.strptime(latest_date, "%Y-%m-%d"):
            print(f"Skipping notice from {notice_date}, as it's not newer than the latest saved date {latest_date}")
            continue

        start_time = time.time()
        try:
            response = requests.get(link, headers=headers)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            if category == '의예과':
                title_element = soup.select_one('h4 strong')
                title = title_element.get_text(strip=True) if title_element else '제목 없음'
                date_element = soup.select_one('div.pull-right.text-right span i.fa-clock-o')
                date = date_element.parent.get_text(strip=True).replace('날짜 없음', '').strip() if date_element else '날짜 없음'

                if date != '날짜 없음':
                    date = datetime.strptime(date, "%Y-%m-%d %H:%M").strftime("%Y-%m-%d")

                content_element = soup.select_one('.board-view-con')
                if content_element:
                    # 본문 내 모든 링크에 도메인 추가
                    for a_tag in content_element.find_all('a', href=True):
                        a_tag['href'] = urljoin(link, a_tag['href'])

                    image_urls = []
                    for img in content_element.find_all('img'):
                        img_src = img['src'].strip()
                        img_url = urljoin(link, img_src)
                        image_urls.append(img_url)
                        img['src'] = img_url

                    content = str(content_element) or '내용 없음'
                    extracted_text = content_element.get_text(strip=True)
                else:
                    content = '내용 없음'
                    extracted_text = '내용 없음'
                    image_urls = []

                # 첨부 파일과 일반 링크 구분
                all_files = []
                valid_links = []

                for a_tag in soup.find_all('a', href=True):
                    href = a_tag['href'].strip()
                    if "/common/downLoad.do" in href or "/file/fileDownLoad.do" in href:
                        file_url = urljoin(link, href)
                        all_files.append(file_url)
                    else:
                        valid_links.append(urljoin(link, href))

                pdf_url = None

                result = {
                    'title': title,
                    'date': date,
                    'content': content,
                    'files': all_files,
                    'extractedText': extracted_text,
                    'images': image_urls,
                    #'links': valid_links,
                    'pdfUrl': pdf_url,
                    'type': notice_link.get('type', {})
                }
                print(f"Processed notice: {result}")
            else:
                print(f"Necessary elements not found for link: {link}")

            valid_links = []  # valid_links를 처음에 초기화

            if matching_category['type'] == 'first':
                title = soup.select_one('h4').get_text(strip=True).replace('제목\t :', '').strip() or '제목 없음'
                date = soup.select_one('span.detail_info_date + span.detail_info_after').get_text(strip=True) or '날짜 없음'
                content_element = soup.select_one('#board_contents')

                all_files = []
                # 첫 번째 카테고리의 파일 링크 추가
                for a_tag in soup.select('div.detail_info span.detail_info_after a[href]'):
                    href = a_tag['href'].strip()
                    if "/common/downLoad.do" in href or "/file/fileDownLoad.do" in href:
                        file_url = urljoin(link, href)
                        all_files.append(file_url)
                    else:
                        valid_links.append(urljoin(link, href))

            elif matching_category['type'] == 'second':
                title = soup.select_one('table.grid .subject').get_text(strip=True) or '제목 없음'
                date = soup.select_one('table.grid th:contains("작성일") + td').get_text(strip=True) or '날짜 없음'
                content_element = soup.select_one('#post_view_txt')

                all_files = []
                # 두 번째 카테고리의 파일 링크 추가
                for a_tag in soup.select('div.post_add div.addfile a[href]'):
                    href = a_tag['href'].strip()
                    if "/common/downLoad.do" in href or "/file/fileDownLoad.do" in href:
                        file_url = urljoin(link, href)
                        all_files.append(file_url)
                    else:
                        valid_links.append(urljoin(link, href))
            image_urls = []
            pdf_url = []
            if content_element:
                clean_content(soup, content_element)

                # 본문 내 모든 링크에 도메인 추가
                for a_tag in content_element.find_all('a', href=True):
                    a_tag['href'] = urljoin(link, a_tag['href'])
                    valid_links.append(a_tag['href'])  # 본문 내 링크도 valid_links에 추가

                pdf_url = None
                iframe_element = content_element.select_one('iframe')
                if iframe_element:
                    # PDF URL 절대 경로로 변환
                    pdf_url = urljoin(link, iframe_element['src'])
                    pdf_embed_code = f'<iframe src="{pdf_url}" width="100%" height="800px"></iframe>'
                    # 기존 iframe 요소를 새로 만든 임베드 코드로 대체
                    content = content_element.prettify().replace(str(iframe_element), pdf_embed_code)
                else:
                    content = content_element.prettify()

                # 본문 내 모든 링크와 이미지에 도메인 추가
                for tag in content_element.find_all(['a', 'img', 'iframe'], src=True):
                    tag['src'] = urljoin(link, tag['src'])

                for tag in content_element.find_all('a', href=True):
                    tag['href'] = urljoin(link, tag['href'])

                # prettify를 통해 HTML 문자열로 변환
                content = content_element.prettify()

                extracted_text = content_element.get_text(strip=True)

                # 결과 확인
                print("PDF URL:", pdf_url)
                print("Content with domain:", content)
                print("Extracted Text:", extracted_text)
            
            result = {
                'title': title,
                'date': date,
                'content': content,
                'files': all_files,
                'extractedText': extracted_text,
                'images': image_urls,
                #'links': valid_links,  # 링크를 links 필드에 저장 (이 줄 주석처리 유지)
                'pdfUrl': pdf_url,
                'type': notice_link.get('type', {})
            }

            print(f"Processed notice: {result}")



        except Exception as e:
            print(f'Error scraping notice content for category {category}:', e)

        elapsed_time = time.time() - start_time
        print(f"Time taken to fetch and process page for {category}: {elapsed_time} seconds")

        if result:
            save_or_update_notice(db, category, result)

    db.client.close()

# 스크립트 실행
if __name__ == "__main__":
    try:
        scrape_and_save_notices()
    except Exception as e:
        print(f"An error occurred: {e}")

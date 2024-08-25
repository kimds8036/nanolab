import requests
from bs4 import BeautifulSoup
import pymongo
from urllib.parse import urljoin
import re
from datetime import datetime

# MongoDB 연결 설정
client = pymongo.MongoClient('mongodb+srv://nanolaebmeta:skshfoqapxk2024!@cluster0.vydwyas.mongodb.net/nanolabmeta?retryWrites=true&w=majority&appName=Cluster0')
db = client['nanolabmeta']
notice_links_collection = db['noticelinks']

headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; Yeti/1.0; +http://naver.me/bot)'
}

def fetch_page(url):
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        print(f"Successfully fetched page: {url}")
        return BeautifulSoup(response.text, 'html.parser')
    except requests.RequestException as e:
        print(f"Error fetching the page at {url}: {e}")
        return None

def extract_notice_links(url, category):
    print(f"Extracting notice links for category: {category} from URL: {url}")
    soup = fetch_page(url)
    if soup is None:
        print(f"Failed to fetch page for category: {category}")
        return []

    notice_links = []

    if category in ['학사공지', '장학공지', '취업/창업공지', '국제/교류공지', '일반공지', '채용공지', '외부행사/공모전']:
        # 공지사항 추출
        for element in soup.select('tr'):
            is_important = element.select_one('span.box_notice') is not None  # 중요 공지 여부 확인
            type_field = 'important' if is_important else 'general'

            link_element = element.select_one('td.ta_left.b_title a')
            href = link_element.get('href') if link_element else None
            if href:
                full_url = 'https://m.kku.ac.kr/user/' + href
                title = link_element.get_text(strip=True) or '제목 없음'
                
                # 날짜 요소 찾기
                date_element = element.select_one('td.b_date') or element.select_one('td.b_etc')
                date = date_element.get_text(strip=True) if date_element else '날짜 없음'
                date = convert_date(date)

                notice_links.append({
                    'title': title,
                    'date': date,
                    'link': full_url,
                    'type': type_field,
                    'category': category
                })

    if category == '의예과':
        for element in soup.select('tr.board-notice'):
            link_element = element.select_one('a[data-itsp-view-link]')
            if link_element:
                seq = link_element.get('data-itsp-view-link')
                title = link_element.select_one('strong').get_text(strip=True) or '제목 없음'
                
                date_element = element.find_next_sibling('tr', class_='td-mobile').select_one('i.fa-clock-o')
                date = date_element.find_parent().get_text(strip=True) if date_element else '날짜 없음'
                date = convert_date(date)
                
                full_url = f"https://medicine.kku.ac.kr/PostView.do?boardSeq=26&menuSeq=72&seq={seq}"
                notice_links.append({
                    'title': title,
                    'date': date,
                    'link': full_url,
                    'type': 'important',
                    'category': category
                })

        for element in soup.select('tr.hidden-xs'):
            link_element = element.select_one('a[data-itsp-view-link]')
            if link_element:
                seq = link_element.get('data-itsp-view-link')
                title = link_element.get_text(strip=True) or '제목 없음'
                
                date = element.select_one('td.td-date').get_text(strip=True) or '날짜 없음'
                date = convert_date(date)
                
                full_url = f"https://medicine.kku.ac.kr/PostView.do?boardSeq=26&menuSeq=72&seq={seq}"
                notice_links.append({
                    'title': title,
                    'date': date,
                    'link': full_url,
                    'type': 'general',
                    'category': category
                })

    else:
        for element in soup.select('tr.note_box'):
            link_element = element.select_one('.subject_click')
            if link_element:
                seq = link_element.get('data-itsp-view-link')
                site_id_match = re.search(r'siteId=([^&]*)', url)
                board_seq_match = re.search(r'boardSeq=([^&]*)', url)
                menu_seq_match = re.search(r'menuSeq=([^&]*)', url)

                if seq and site_id_match and board_seq_match and menu_seq_match:
                    site_id = site_id_match.group(1)
                    board_seq = board_seq_match.group(1)
                    menu_seq = menu_seq_match.group(1)
                    full_url = f"{url.split('/noticeList.do')[0]}/noticeView.do?siteId={site_id}&boardSeq={board_seq}&menuSeq={menu_seq}&seq={seq}"
                    title = link_element.get_text(strip=True) or '제목 없음'
                    date = element.select_one('td:nth-child(4)').get_text(strip=True) or '날짜 없음'
                    date = convert_date(date)
                    notice_links.append({
                        'title': title,
                        'date': date,
                        'link': full_url,
                        'type': 'important',
                        'category': category
                    })
        
        for element in soup.select('#dispList tr'):
            link_element = element.select_one('.subject_click')
            if link_element:
                seq = link_element.get('data-itsp-view-link')
                site_id_match = re.search(r'siteId=([^&]*)', url)
                board_seq_match = re.search(r'boardSeq=([^&]*)', url)
                menu_seq_match = re.search(r'menuSeq=([^&]*)', url)

                if seq and site_id_match and board_seq_match and menu_seq_match:
                    site_id = site_id_match.group(1)
                    board_seq = board_seq_match.group(1)
                    menu_seq = menu_seq_match.group(1)
                    full_url = f"{url.split('/noticeList.do')[0]}/noticeView.do?siteId={site_id}&boardSeq={board_seq}&menuSeq={menu_seq}&seq={seq}"
                    title = link_element.get_text(strip=True) or '제목 없음'
                    date = element.select_one('td:nth-child(4)').get_text(strip=True) or '날짜 없음'
                    date = convert_date(date)

                    notice_links.append({
                        'title': title,
                        'date': date,
                        'link': full_url,
                        'type': 'general',
                        'category': category
                    })

    return notice_links

def scrape_notice_links():
    # 카테고리 배열은 여기에 추가
    categories = [
          { 'name': '학사공지', 'urls': ['https://m.kku.ac.kr/user/boardList.do?boardId=1489&siteId=wwwkr&page=1&id=wwwkr_070102000000'] },
{ 'name': '의예과', 'urls': ['https://medicine.kku.ac.kr/PostList.do?boardSeq=26&categorySeq=&menuSeq=72&searchBy=all&searchValue=&curPage=30&page=1'] },
{ 'name': '신문방송학과', 'urls': ['https://masscom.kku.ac.kr/noticeList.do?siteId=MASSCOM&boardSeq=19&menuSeq=154&curPage=30&page=1'] },
  { 'name': '동화.한국어문화학과', 'urls': ['https://dongwha.kku.ac.kr/noticeList.do?siteId=DONGWHA&boardSeq=215&menuSeq=4579&curPage=30&page=1'] },
  
  { 'name': '장학공지', 'urls': ['https://m.kku.ac.kr/user/boardList.do?boardId=1497&siteId=wwwkr&page=1&id=wwwkr_070103000000'] },
  { 'name': '취업/창업공지', 'urls': ['https://m.kku.ac.kr/user/boardList.do?boardId=1516&siteId=wwwkr&page=1&id=wwwkr_070105000000'] },
  { 'name': '국제/교류공지', 'urls': ['https://m.kku.ac.kr/user/boardList.do?boardId=35358&siteId=wwwkr&page=1&id=wwwkr_070109000000'] },
  { 'name': '일반공지', 'urls': ['https://m.kku.ac.kr/user/boardList.do?boardId=1481&siteId=wwwkr&page=1&id=wwwkr_070101000000'] },
  { 'name': '채용공지', 'urls': ['https://m.kku.ac.kr/user/boardList.do?boardId=97694&siteId=wwwkr&page=1&id=wwwkr_070112000000'] },
  { 'name': '외부행사/공모전', 'urls': ['https://m.kku.ac.kr/user/boardList.do?boardId=1584&siteId=wwwkr&page=1&id=wwwkr_070306000000'] },

  { 'name': '영어문화학과', 'urls': ['https://kuell.kku.ac.kr/noticeList.do?siteId=KUELL2&boardSeq=235&menuSeq=1697&curPage=30&page=1'] },
  { 'name': '패션디자인학과', 'urls': ['https://fashion.kku.ac.kr/noticeList.do?siteId=KKUAD&boardSeq=15&menuSeq=7566&curPage=30&page=1'] },
  { 'name': '뷰티화장품학과', 'urls': ['https://beauty.kku.ac.kr/noticeList.do?siteId=BEAUTY&boardSeq=278&menuSeq=1956&curPage=30&page=1'] },
  { 'name': '산업디자인학과', 'urls': ['https://kkuid.kku.ac.kr/noticeList.do?siteId=KKUID&boardSeq=252&menuSeq=7881&curPage=30&page=1'] },
  { 'name': '시각영상디자인학과', 'urls': ['https://visualad.kku.ac.kr/noticeList.do?siteId=VISUALAD&boardSeq=1135&menuSeq=7486&curPage=30&page=1'] },
  { 'name': '실내디자인학과', 'urls': ['https://interior.kku.ac.kr/noticeList.do?siteId=INTERIOR2&boardSeq=287&menuSeq=7887&curPage=30&page=1'] },
  { 'name': '경영학과', 'urls': ['https://biz.kku.ac.kr/noticeList.do?siteId=BIZ&boardSeq=256&menuSeq=1761&curPage=30&page=1'] },
  { 'name': '경제통상학과', 'urls': ['https://trade.kku.ac.kr/noticeList.do?siteId=TRADE2&boardSeq=294&menuSeq=2160&curPage=30&page=1'] },
  { 'name': '경찰학과', 'urls': ['https://police.kku.ac.kr/noticeList.do?siteId=POLICE&boardSeq=995&menuSeq=4487&curPage=30&page=1'] },
  { 'name': '소방방재융합학과', 'urls': ['https://fire.kku.ac.kr/noticeList.do?siteId=FIRE&boardSeq=1116&menuSeq=8399&curPage=30&page=1'] },
  { 'name': '문헌정보학과', 'urls': ['https://lis.kku.ac.kr/noticeList.do?siteId=LIS&boardSeq=458&menuSeq=3200&curPage=30&page=1'] },
  { 'name': '유아교육과', 'urls': ['https://ece.kku.ac.kr/noticeList.do?siteId=ECE&boardSeq=453&menuSeq=3005&curPage=30&page=1'] },
  { 'name': '사회복지학과', 'urls': ['https://sw.kku.ac.kr/noticeList.do?siteId=SW&boardSeq=476&menuSeq=3130&curPage=30&page=1'] },
  { 'name': '메카트로닉스공학과', 'urls': ['https://mechatronics.kku.ac.kr/noticeList.do?siteId=NSME&boardSeq=414&menuSeq=2814&curPage=30&page=1'] },
  { 'name': '컴퓨터공학과', 'urls': ['https://cs.kku.ac.kr/noticeList.do?siteId=CS&boardSeq=2095&menuSeq=8848&curPage=30&page=1'] },
  { 'name': '바이오메디컬공학과', 'urls': ['https://kkubme.kku.ac.kr/noticeList.do?siteId=KKUBME&boardSeq=399&menuSeq=3378&curPage=30&page=1'] },
  { 'name': '녹색기술융합학과', 'urls': ['https://greentech.kku.ac.kr/noticeList.do?siteId=GREENTECH&boardSeq=427&menuSeq=2856&curPage=30&page=1'] },
  { 'name': '에너지신소재공학과', 'urls': ['https://chemistry.kku.ac.kr/noticeList.do?siteId=SCIENCE&boardSeq=39&menuSeq=398&curPage=30&page=1'] },
  { 'name': '바이오의약학과', 'urls': ['https://biomedchem.kku.ac.kr/noticeList.do?siteId=BIOMEDCHEM&boardSeq=345&menuSeq=5872&curPage=30&page=1'] },
  { 'name': '생명공학학과', 'urls': ['https://biotech.kku.ac.kr/noticeList.do?siteId=BIOTECH&boardSeq=365&menuSeq=2506&curPage=30&page=1'] },
  { 'name': '식품영양학과', 'urls': ['https://foodbio.kku.ac.kr/noticeList.do?siteId=FOODBIO&boardSeq=359&menuSeq=8210&curPage=30&page=1'] },
  { 'name': '스포츠건강학과', 'urls': ['https://sports.kku.ac.kr/noticeList.do?siteId=SPORTS&boardSeq=375&menuSeq=2657&curPage=30&page=1'] },
  { 'name': '골프산업학과', 'urls': ['https://golf.kku.ac.kr/noticeList.do?siteId=GOLF&boardSeq=451&menuSeq=2978&curPage=30&page=1'] },

  { 'name': '혁신공유대학', 'urls': ['https://healingbio.kku.ac.kr/noticeList.do?siteId=HEALINGBIO&boardSeq=1219&menuSeq=8964&curPage=30&page=1'] }
]
    
    for category in categories:
        for url in category['urls']:
            max_page = 3 if category['name'] in ['학사공지', '장학공지', '취업/창업공지', '국제/교류공지', '일반공지', '채용공지', '외부행사/공모전'] else 1
            for page in range(1, max_page + 1):
                page_url = f"{url.split('page=')[0]}page={page}" if 'page=' in url else f"{url}&page={page}"
                notice_links = extract_notice_links(page_url, category['name'])

                for notice in notice_links:
                    try:
                        # 동일한 링크가 DB에 있는지 확인 후, 존재하면 삭제하고 새로운 데이터로 추가
                        existing_notice = notice_links_collection.find_one({'link': notice['link']})
                        if existing_notice:
                            notice_links_collection.delete_one({'_id': existing_notice['_id']})
                        
                        # 새롭게 추가
                        notice_links_collection.insert_one(notice)
                        print(f"Notice saved or updated: {notice['title']}")
                    except Exception as e:
                        print(f"Error processing notice {notice['title']}: {e}")

def convert_date(date_str):
    for fmt in ('%Y-%m-%d', '%Y.%m.%d', '%y.%m.%d', '%Y.%m.%d'):
        try:
            return datetime.strptime(date_str, fmt).strftime('%Y-%m-%d')
        except ValueError:
            continue
    return date_str

scrape_notice_links()


scrape_notice_links()



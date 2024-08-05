const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const NoticeLink = require('../models/noticelink'); // 경로 수정

mongoose.connect('mongodb://localhost:27017/university_notices', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  { name: '학사공지', urls: ['https://m.kku.ac.kr/user/boardList.do?boardId=1489&siteId=wwwkr&page=1&id=wwwkr_070102000000'] },
  { name: '장학공지', urls: ['https://m.kku.ac.kr/user/boardList.do?boardId=1497&siteId=wwwkr&page=1&id=wwwkr_070103000000'] },
  { name: '취업/창업공지', urls: ['https://m.kku.ac.kr/user/boardList.do?boardId=1516&siteId=wwwkr&page=1&id=wwwkr_070105000000'] },
  { name: '국제/교류공지', urls: ['https://m.kku.ac.kr/user/boardList.do?boardId=35358&siteId=wwwkr&page=1&id=wwwkr_070109000000'] },
  { name: '일반공지', urls: ['https://m.kku.ac.kr/user/boardList.do?boardId=1481&siteId=wwwkr&page=1&id=wwwkr_070101000000'] },
  { name: '채용공지', urls: ['https://m.kku.ac.kr/user/boardList.do?boardId=97694&siteId=wwwkr&page=1&id=wwwkr_070112000000'] },
  { name: '외부행사/공모전', urls: ['https://m.kku.ac.kr/user/boardList.do?boardId=1584&siteId=wwwkr&page=1&id=wwwkr_070306000000'] },
  { name: '신문방송학과', urls: ['https://masscom.kku.ac.kr/noticeList.do?siteId=MASSCOM&boardSeq=19&menuSeq=154&curPage=30&page=1'] },
  { name: '동화.한국어문화학과', urls: ['https://dongwha.kku.ac.kr/noticeList.do?siteId=DONGWHA&boardSeq=215&menuSeq=4579&curPage=30&page=1'] },
  { name: '영어문화학과', urls: ['https://kuell.kku.ac.kr/noticeList.do?siteId=KUELL2&boardSeq=235&menuSeq=1697&curPage=30&page=1'] },
  { name: '패션디자인학과', urls: ['https://fashion.kku.ac.kr/noticeList.do?siteId=KKUAD&boardSeq=15&menuSeq=7566&curPage=30&page=1'] },
  { name: '뷰티화장품학과', urls: ['https://beauty.kku.ac.kr/noticeList.do?siteId=BEAUTY&boardSeq=278&menuSeq=1956&curPage=30&page=1'] },
  { name: '산업디자인학과', urls: ['https://kkuid.kku.ac.kr/noticeList.do?siteId=KKUID&boardSeq=252&menuSeq=7881&curPage=30&page=1'] },
  { name: '시각영상디자인학과', urls: ['https://visualad.kku.ac.kr/noticeList.do?siteId=VISUALAD&boardSeq=1135&menuSeq=7486&curPage=30&page=1'] },
  { name: '실내디자인학과', urls: ['https://interior.kku.ac.kr/noticeList.do?siteId=INTERIOR2&boardSeq=287&menuSeq=7887&curPage=30&page=1'] },
  { name: '경영학과', urls: ['https://biz.kku.ac.kr/noticeList.do?siteId=BIZ&boardSeq=256&menuSeq=1761&curPage=30&page=1'] },
  { name: '경제통상학과', urls: ['https://trade.kku.ac.kr/noticeList.do?siteId=TRADE2&boardSeq=294&menuSeq=2160&curPage=30&page=1'] },
  { name: '경찰학과', urls: ['https://police.kku.ac.kr/noticeList.do?siteId=POLICE&boardSeq=995&menuSeq=4487&curPage=30&page=1'] },
  { name: '소방방재융합학과', urls: ['https://fire.kku.ac.kr/noticeList.do?siteId=FIRE&boardSeq=1116&menuSeq=8399&curPage=30&page=1'] },
  { name: '문헌정보학과', urls: ['https://lis.kku.ac.kr/noticeList.do?siteId=LIS&boardSeq=458&menuSeq=3200&curPage=30&page=1'] },
  { name: '유아교육과', urls: ['https://ece.kku.ac.kr/noticeList.do?siteId=ECE&boardSeq=453&menuSeq=3005&curPage=30&page=1'] },
  { name: '사회복지학과', urls: ['https://sw.kku.ac.kr/noticeList.do?siteId=SW&boardSeq=476&menuSeq=3130&curPage=30&page=1'] },
  { name: '메카트로닉스공학과', urls: ['https://mechatronics.kku.ac.kr/noticeList.do?siteId=NSME&boardSeq=414&menuSeq=2814&curPage=30&page=1'] },
  { name: '컴퓨터공학과', urls: ['https://cs.kku.ac.kr/noticeList.do?siteId=CS&boardSeq=2095&menuSeq=8848&curPage=30&page=1'] },
  { name: '바이오메디컬공학과', urls: ['https://kkubme.kku.ac.kr/noticeList.do?siteId=KKUBME&boardSeq=399&menuSeq=3378&curPage=30&page=1'] },
  { name: '녹색기술융합학과', urls: ['https://greentech.kku.ac.kr/noticeList.do?siteId=GREENTECH&boardSeq=427&menuSeq=2856&curPage=30&page=1'] },
  { name: '에너지신소재공학과', urls: ['https://chemistry.kku.ac.kr/noticeList.do?siteId=SCIENCE&boardSeq=39&menuSeq=398&curPage=30&page=1'] },
  { name: '바이오의약학과', urls: ['https://biomedchem.kku.ac.kr/noticeList.do?siteId=BIOMEDCHEM&boardSeq=345&menuSeq=5872&curPage=30&page=1'] },
  { name: '생명공학학과', urls: ['https://biotech.kku.ac.kr/noticeList.do?siteId=BIOTECH&boardSeq=365&menuSeq=2506&curPage=30&page=1'] },
  { name: '식품영양학과', urls: ['https://foodbio.kku.ac.kr/noticeList.do?siteId=FOODBIO&boardSeq=359&menuSeq=8210&curPage=30&page=1'] },
  { name: '스포츠건강학', urls: ['https://sports.kku.ac.kr/noticeList.do?siteId=SPORTS&boardSeq=375&menuSeq=2657&curPage=30&page=1'] },
  { name: '골프산업학과', urls: ['https://golf.kku.ac.kr/noticeList.do?siteId=GOLF&boardSeq=451&menuSeq=2978&curPage=30&page=1'] },
  { name: '의예과', urls: ['https://medicine.kku.ac.kr/PostList.do?boardSeq=26&menuSeq=72&curPage=30&page=1'] },
  { name: '혁신공유대학', urls: ['https://healingbio.kku.ac.kr/noticeList.do?siteId=HEALINGBIO&boardSeq=1219&menuSeq=8964&curPage=30&page=1'] }
];


async function fetchPage(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

async function extractNoticeLinks(url, category) {
  const $ = await fetchPage(url);
  const noticeLinks = [];

  if (['학사공지', '장학공지', '취업/창업공지', '국제/교류공지', '일반공지', '채용공지' ,'외부행사/공모전'].includes(category)) {
    // 중요 공지사항 추출
    $('td.b_num .box_notice').closest('tr').each((index, element) => {
      const linkElement = $(element).find('td.ta_left.b_title a');
      const href = linkElement.attr('href');
      const fullUrl = 'https://m.kku.ac.kr/user/' + href;
      const title = linkElement.text().trim() || '제목 없음';
      const date = $(element).find('td.b_date').text().trim() || new Date().toISOString().split('T')[0];
      const views = $(element).find('td.b_count').text().trim() || '0';
      noticeLinks.push({ title, date, link: fullUrl, views, type: 'important' });
    });

    // 일반 공지사항 추출
    $('td.ta_left.b_title a').each((index, element) => {
      const href = $(element).attr('href');
      const fullUrl = 'https://m.kku.ac.kr/user/' + href;
      const title = $(element).text().trim() || '제목 없음';
      const date = $(element).closest('tr').find('td.b_etc').eq(0).text().trim() || new Date().toISOString().split('T')[0];
      const views = $(element).closest('tr').find('td.b_etc').eq(1).text().trim() || '0';
      noticeLinks.push({ title, date, link: fullUrl, views, type: 'general' });
    });
  } else {
    // 학과 홈페이지의 중요 공지사항 추출
    $('tr.note_box').each((index, element) => {
      const seq = $(element).find('.subject_click').attr('data-itsp-view-link');
      const siteId = url.match(/siteId=([^&]*)/)[1];
      const boardSeq = url.match(/boardSeq=([^&]*)/)[1];
      const menuSeq = url.match(/menuSeq=([^&]*)/)[1];
      const fullUrl = `${url.split('/noticeList.do')[0]}/noticeView.do?siteId=${siteId}&boardSeq=${boardSeq}&menuSeq=${menuSeq}&seq=${seq}`;
      const title = $(element).find('.subject_click').text().trim() || '제목 없음';
      const date = $(element).find('td').eq(3).text().trim() || new Date().toISOString().split('T')[0]; // 날짜 추출
      const views = $(element).find('td').eq(4).text().trim() || '0';
      noticeLinks.push({ title, date, link: fullUrl, views, type: 'important' }); // type 필드 추가
    });

    // 학과 홈페이지의 일반 공지사항 추출
    $('#dispList tr').each((index, element) => {
      const seq = $(element).find('.subject_click').attr('data-itsp-view-link');
      const siteId = url.match(/siteId=([^&]*)/)[1];
      const boardSeq = url.match(/boardSeq=([^&]*)/)[1];
      const menuSeq = url.match(/menuSeq=([^&]*)/)[1];
      const fullUrl = `${url.split('/noticeList.do')[0]}/noticeView.do?siteId=${siteId}&boardSeq=${boardSeq}&menuSeq=${menuSeq}&seq=${seq}`;
      const title = $(element).find('.subject_click').text().trim() || '제목 없음';
      const date = $(element).find('td').eq(3).text().trim() || new Date().toISOString().split('T')[0]; // 날짜 추출
      const views = $(element).find('td').eq(4).text().trim() || '0';
      noticeLinks.push({ title, date, link: fullUrl, views, type: 'general' }); // type 필드 추가
    });
  }

  return noticeLinks;
}



async function scrapeNoticeLinks() {
  for (const category of categories) {
    //createCategoryFolder(category.name);  // 폴더 생성
    for (const url of category.urls) {
      const maxPage = ['학사공지', '장학공지', '취업/창업공지', '국제/교류공지', '일반공지', '채용공지', '외부행사/공모전'].includes(category.name) ? 3 : 1;
      for (let page = 1; page <= maxPage; page++) {
        const pageUrl = url.includes('page=') ? `${url.split('page=')[0]}page=${page}` : `${url}&page=${page}`;
        const noticeLinks = await extractNoticeLinks(pageUrl, category.name); // 여기서 noticeLinks 변수를 선언합니다.
        for (const notice of noticeLinks) { // 여기서 const notice를 선언했습니다.
          const existingNotice = await NoticeLink.findOne({ link: notice.link });
          if (!existingNotice) {
            const noticeLink = new NoticeLink({
              category: category.name,
              title: notice.title || '제목 없음', // 기본값 설정
              link: notice.link,
              date: notice.date || new Date().toISOString().split('T')[0], // 기본값 설정
              views: notice.views || '0', // 기본값 설정
              type: notice.type // type 필드 추가
            });
            await noticeLink.save();
          }
        }
      }
    }
  }
}


scrapeNoticeLinks()
  .then(() => {
    console.log('Scraping completed');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error during scraping', err);
    mongoose.connection.close();
  });

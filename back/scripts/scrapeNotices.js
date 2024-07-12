const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

// MongoDB 모델
const NoticeLink = require('../models/NoticeLink');

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/university_notices');

const categories = [
  { name: '학사공지', site: 'm.kku.ac.kr', boardId: 1489 },
  { name: '장학공지', site: 'm.kku.ac.kr', boardId: 1497 },
  { name: '취업/창업', site: 'm.kku.ac.kr', boardId: 1516 },
  { name: '국제/교류', site: 'm.kku.ac.kr', boardId: 35358 },
  { name: '일반공지', site: 'm.kku.ac.kr', boardId: 1481 },
  { name: '채용공지', site: 'm.kku.ac.kr', boardId: 97694 },
  { name: '신문방송학과', site: 'masscom.kku.ac.kr', boardId: 19, menuSeq: 154 },
  { name: '동화.한국어문화학과', site: 'dongwha.kku.ac.kr', boardId: 215, menuSeq: 4579 },
  { name: '영어문화학과', site: 'kuell.kku.ac.kr', boardId: 235, menuSeq: 1697 },
  { name: '패션디자인학과', site: 'fashion.kku.ac.kr', boardId: 15, menuSeq: 7566 },
  { name: '뷰티화장품학과', site: 'beauty.kku.ac.kr', boardId: 278, menuSeq: 1956 },
  { name: '산업디자인학과', site: 'kkuid.kku.ac.kr', boardId: 252, menuSeq: 7881 },
  { name: '시각영상디자인학과', site: 'visualad.kku.ac.kr', boardId: 1135, menuSeq: 7486 },
  { name: '실내디자인학과', site: 'interior.kku.ac.kr', boardId: 287, menuSeq: 7887 },
  { name: '경영학과', site: 'biz.kku.ac.kr', boardId: 256, menuSeq: 1761 },
  { name: '경제통상학과', site: 'trade.kku.ac.kr', boardId: 294, menuSeq: 2160 },
  { name: '경찰학과', site: 'police.kku.ac.kr', boardId: 995, menuSeq: 4487 },
  { name: '소방방재융합학과', site: 'fire.kku.ac.kr', boardId: 1116, menuSeq: 8399 },
  { name: '문헌정보학과', site: 'lis.kku.ac.kr', boardId: 458, menuSeq: 3200 },
  { name: '유아교육과', site: 'ece.kku.ac.kr', boardId: 453, menuSeq: 3005 },
  { name: '사회복지학과', site: 'sw.kku.ac.kr', boardId: 476, menuSeq: 3130 },
  { name: '메카트로닉스공학과', site: 'mechatronics.kku.ac.kr', boardId: 414, menuSeq: 2814 },
  { name: '컴퓨터공학과', site: 'cs.kku.ac.kr', boardId: 2095, menuSeq: 8848 },
  { name: '바이오메디컬공학과', site: 'kkubme.kku.ac.kr', boardId: 399, menuSeq: 3378 },
  { name: '녹색기술융합학과', site: 'greentech.kku.ac.kr', boardId: 427, menuSeq: 2856 },
  { name: '에너지신소재공학과', site: 'chemistry.kku.ac.kr', boardId: 39, menuSeq: 398 },
  { name: '바이오의약학과', site: 'biomedchem.kku.ac.kr', boardId: 345, menuSeq: 5872 },
  { name: '생명공학학과', site: 'biotech.kku.ac.kr', boardId: 365, menuSeq: 2506 },
  { name: '식품영양학과', site: 'foodbio.kku.ac.kr', boardId: 359, menuSeq: 8210 },
  { name: '스포츠건강학', site: 'sports.kku.ac.kr', boardId: 375, menuSeq: 2657 },
  { name: '골프산업학과', site: 'golf.kku.ac.kr', boardId: 451, menuSeq: 2978 },
  { name: '의예과', site: 'medicine.kku.ac.kr', boardId: 26, menuSeq: 72 },
  { name: '혁신공유대학', site: 'healingbio.kku.ac.kr', boardId: 1219, menuSeq: 8964 },
];

async function fetchPage(url) {
  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch (error) {
    console.error(`Failed to fetch page: ${url}`, error.message);
    return null;
  }
}

async function extractNoticeLinks(site, boardId, menuSeq, page) {
  const baseUrl = menuSeq
    ? `https://${site}/noticeList.do?siteId=${site.split('.')[0]}&boardSeq=${boardId}&menuSeq=${menuSeq}&curPage=${page}&pageNum=1`
    : `https://${site}/user/boardList.do?boardId=${boardId}&siteId=wwwkr&page=${page}&id=wwwkr_070102000000`;
  const $ = await fetchPage(baseUrl);
  if (!$) return [];
  const noticeLinks = [];
  $('td.b_title a').each((index, element) => {
    const href = $(element).attr('href');
    const fullUrl = menuSeq
      ? `https://${site}/${href}`
      : `https://${site}/user/${href}`;
    noticeLinks.push(fullUrl);
  });
  return noticeLinks;
}

async function scrapeNoticeLinks() {
  for (const category of categories) {
    for (let page = 1; page <= 3; page++) {
      const noticeLinks = await extractNoticeLinks(category.site, category.boardId, category.menuSeq, page);
      for (const link of noticeLinks) {
        const noticeLink = new NoticeLink({ category: category.name, link });
        await noticeLink.save();
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

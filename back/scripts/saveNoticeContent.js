const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const NoticeLink = require('../models/NoticeLink');
const NoticeContent = require('../models/NoticeContent');

mongoose.connect('mongodb://localhost:27017/university_notices', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function fetchPage(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

async function scrapeNoticeContent(noticeLink) {
  const $ = await fetchPage(noticeLink.link);

  // 제목 추출
  const title = $('h4').text().replace('제목 :', '').trim();

  // 본문 내용 추출
  const contentElement = $('#board_contents');
  const content = contentElement.html().trim();

  // 조회수 추출
  const views = parseInt($('span.detail_info_after').eq(1).text().trim(), 10) || 0;

  // 첨부파일 추출
  const attachments = [];
  $('a[href*="/common/downLoad.do"]').each((index, element) => {
    const filename = $(element).text().trim();
    const url = 'https://m.kku.ac.kr' + $(element).attr('href');
    attachments.push({ filename, url });
  });

  // MongoDB에 저장
  const noticeContent = new NoticeContent({
    category: noticeLink.category,
    title,
    content,
    views,
    attachments
  });

  await noticeContent.save();
}

async function scrapeAllNoticeContents() {
  const noticeLinks = await NoticeLink.find();
  for (const noticeLink of noticeLinks) {
    try {
      await scrapeNoticeContent(noticeLink);
    } catch (err) {
      console.error(`Failed to scrape content from ${noticeLink.link}:`, err);
    }
  }
}

scrapeAllNoticeContents()
  .then(() => {
    console.log('All notice contents have been scraped and saved.');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error during scraping', err);
    mongoose.connection.close();
  });

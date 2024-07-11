const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const files = [
  '장학 공지_notices.json',
  '학사공지_notices.json',
  '취업_창업_notices.json',
  '국제교류_notices.json',
  '입찰공지_notices.json'
];

async function fetchPage(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

// Function to remove style attributes
function removeStyleAttributes($element) {
  $element.find('*').each((index, el) => {
    $(el).removeAttr('style');
  });
}

async function extractDetails() {
  for (const file of files) {
    const data = fs.readFileSync(file);
    const notices = JSON.parse(data);

    for (const notice of notices) {
      try {
        const $ = await fetchPage(notice.link);

        // 작성 일자와 조회수 추출
        const detailInfo = $('span.detail_info_after');
        const date = $(detailInfo[0]).text().trim(); // 첫 번째 span이 작성 일자
        const views = $(detailInfo[1]).text().trim(); // 두 번째 span이 조회수

        // 본문 내용 추출 (텍스트와 표를 포함하여 HTML 태그 유지)
        const contentElement = $('#board_contents');
        removeStyleAttributes(contentElement); // 스타일 속성 제거
        const content = contentElement.html().trim();

        // 첨부파일 추출
        const attachments = [];
        $('a[href*="/common/downLoad.do"]').each((index, element) => {
          const filename = $(element).text().trim();
          const url = 'https://m.kku.ac.kr' + $(element).attr('href');
          attachments.push({ filename, url });
        });

        notice.detailContent = {
          date,
          views,
          content,
          attachments
        };

        console.log(`Fetched details for notice: ${notice.title}`);
      } catch (error) {
        console.error(`Error fetching details for notice: ${notice.title}`, error);
      }
    }

    const outputFileName = path.basename(file, '.json') + '_details.json';
    fs.writeFileSync(outputFileName, JSON.stringify(notices, null, 2));
  }
}

extractDetails();

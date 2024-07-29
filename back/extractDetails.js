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

// Function to remove unnecessary attributes, comments, and specific meta-data
function cleanContent($, $element) {
  // Remove all style attributes
  $element.find('*').each((index, el) => {
    $(el).removeAttr('style');
  });

  // Remove all comments
  $element.contents().each((index, el) => {
    if (el.type === 'comment') {
      $(el).remove();
    }
  });

  // Remove specific meta-data
  let htmlContent = $element.html();
  htmlContent = htmlContent.replace(/<!--\[if[^>]*>[\s\S]*?<!\[endif\]-->/gi, '');
  htmlContent = htmlContent.replace(/<!--\[data-hwpjson\][\s\S]*?-->/gi, '');
  htmlContent = htmlContent.replace(/\n/g, ''); // \n 제거 추가
  $element.html(htmlContent);

  // Keep only allowed tags (e.g., p, table, tr, td, th)
  const allowedTags = ['p', 'table', 'tr', 'td', 'th', 'thead', 'tbody'];
  $element.find('*').each((index, el) => {
    if (!allowedTags.includes(el.tagName.toLowerCase())) {
      $(el).replaceWith($(el).html());
    }
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
        cleanContent($, contentElement); // 불필요한 속성과 태그 제거
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

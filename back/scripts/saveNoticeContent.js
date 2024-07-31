const mongoose = require('mongoose');
const { fetchPage } = require('./utils'); // fetchPage 함수 가져오기

// cleanContent 함수 정의
function cleanContent($, $element) {
  $element.contents().each((index, el) => {
    if (el.type === 'comment') {
      $(el).remove();
    }
  });

  let htmlContent = $element.html() || '';
  htmlContent = htmlContent.replace(/<!--\[if[^>]*>[\s\S]*?<!\[endif\]-->/gi, '');
  htmlContent = htmlContent.replace(/<!--\[data-hwpjson\][\s\S]*?-->/gi, '');
  htmlContent = htmlContent.replace(/\n/g, '');
  $element.html(htmlContent);

  const allowedTags = ['p', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'span', 'div'];
  $element.find('*').each((index, el) => {
    if (!allowedTags.includes(el.tagName.toLowerCase())) {
      $(el).replaceWith($(el).html());
    }
  });
}

// MongoDB 연결
const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/university_notices', {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // 연결 타임아웃 설정
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // 연결 실패 시 프로세스 종료
  }
};

// NoticeLink 모델 정의
const noticeLinkSchema = new mongoose.Schema({
  link: { type: String, required: true },
  category: { type: String, required: true }
});
const NoticeLink = mongoose.model('NoticeLink', noticeLinkSchema);

// 공지사항 모델 정의
const createDynamicModel = (collectionName) => {
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName]; // 이미 정의된 모델이 있으면 반환
  }
  const schema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    views: { type: String, required: false },
    content: { type: String, required: false },
    files: { type: [String], required: false },
    dDay: { type: String, required: false },
    extractedText: { type: String, required: false }
  });
  return mongoose.model(collectionName, schema, collectionName);
};

// 공지사항을 카테고리별 컬렉션에 저장 또는 업데이트
const saveOrUpdateNotice = async (category, noticeData) => {
  try {
    const collectionName = `notices_${category}`;
    const DynamicModel = createDynamicModel(collectionName);

    // 중복된 데이터가 있을 경우 업데이트하고, 없을 경우 새로 삽입
    await DynamicModel.updateOne(
      { title: noticeData.title, date: noticeData.date },
      { $set: noticeData },
      { upsert: true } // upsert: true로 설정하면 조건에 맞는 데이터가 없을 때 새로 삽입
    );
    console.log(`Notice saved or updated in ${collectionName}:`, noticeData);
  } catch (error) {
    console.error('Error saving or updating notice in category collection:', error);
  }
};

// 공지사항 링크 스크랩 및 저장
const scrapeAndSaveNotices = async () => {
  await connectToMongoDB();

  const noticeLinks = await NoticeLink.find({});

  const firstCategory = ['학사공지', '장학공지', '취업/창업공지', '국제/교류공지', '일반공지', '채용공지', '외부행사/공모전'];
  const secondCategoryKeywords = ['학과', '혁신공유대학', '의예과'];

  for (const noticeLink of noticeLinks) {
    const { link, category } = noticeLink;
    let noticeData;

    const isSecondCategory = secondCategoryKeywords.some(keyword => category.includes(keyword));

    if (isSecondCategory) {
      // 두 번째 종류의 공지사항 스크래핑 함수 호출
      noticeData = await scrapeSecondCategoryNoticeContent(link);
    } else if (firstCategory.includes(category)) {
      // 첫 번째 종류의 공지사항 스크래핑 함수 호출
      noticeData = await scrapeFirstCategoryNoticeContent(link);
    } else {
      console.warn(`Unrecognized category: ${category}`);
      continue;
    }

    await saveOrUpdateNotice(category, noticeData);
  }

  mongoose.connection.close(); // MongoDB 연결 종료
};

// 두 번째 종류의 공지사항 내용 스크래핑
const scrapeSecondCategoryNoticeContent = async (link) => {
  try {
    const $ = await fetchPage(link);

    // HTML 구조 식별
    const title = $('table.grid .subject').text().trim() || '제목 없음';
    console.log(`Title extracted: ${title}`);

    const date = $('table.grid th:contains("작성일")').next('td').text().trim() || '날짜 없음';
    console.log(`Date extracted: ${date}`);

    const views = $('table.grid th:contains("조회수")').next('td').text().trim() || '조회수 없음';
    console.log(`Views extracted: ${views}`);

    const contentElement = $('#post_view_txt');
    cleanContent($, contentElement);
    const content = contentElement.html() ? contentElement.html().trim() : '내용 없음';
    console.log(`Content extracted: ${content}`);

    const extractedText = contentElement.text().replace(/[\n\r\t\u0020\u00a0\u3000]/g, ' ').trim();
    console.log(`Extracted Text: ${extractedText}`);

    const files = [];
    $('a[href*="/file/fileDownLoad.do"]').each((index, element) => {
      const url = 'https://m.kku.ac.kr' + $(element).attr('href');
      files.push(url);
    });
    console.log(`Files extracted: ${files}`);

    return { title, date, views, content, files, extractedText };
  } catch (error) {
    console.error('Error scraping second category notice content:', error);
    return {
      title: 'Error',
      date: 'Error',
      views: 'Error',
      content: 'Error',
      files: [],
      extractedText: 'Error'
    };
  }
};

// 첫 번째 종류의 공지사항 내용 스크래핑
const scrapeFirstCategoryNoticeContent = async (link) => {
  try {
    const $ = await fetchPage(link);

    // HTML 구조 식별
    const title = $('h4').text().trim().replace('제목\t :', '').trim() || '제목 없음';
    console.log(`Title extracted: ${title}`);

    const date = $('span.detail_info_date').next('span.detail_info_after').text().trim() || '날짜 없음';
    console.log(`Date extracted: ${date}`);

    const views = $('span.detail_info_hit').next('span.detail_info_after').text().trim() || '조회수 없음';
    console.log(`Views extracted: ${views}`);

    const contentElement = $('#board_contents');
    cleanContent($, contentElement);
    const content = contentElement.html() ? contentElement.html().trim() : '내용 없음';
    console.log(`Content extracted: ${content}`);

    const extractedText = contentElement.text().replace(/[\n\r\t\u0020\u00a0\u3000]/g, ' ').trim();
    console.log(`Extracted Text: ${extractedText}`);

    const files = [];
    $('a[href*="/common/downLoad.do"]').each((index, element) => {
      const url = 'https://m.kku.ac.kr' + $(element).attr('href');
      files.push(url);
    });
    console.log(`Files extracted: ${files}`);

    return { title, date, views, content, files, extractedText };
  } catch (error) {
    console.error('Error scraping first category notice content:', error);
    return {
      title: 'Error',
      date: 'Error',
      views: 'Error',
      content: 'Error',
      files: [],
      extractedText: 'Error'
    };
  }
};

// 스크래핑 및 저장 실행
scrapeAndSaveNotices();

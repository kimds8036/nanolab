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

// 공지사항을 카테고리별 컬렉션에 저장
const saveNoticeToCategoryCollection = async (category, noticeData) => {
  try {
    const collectionName = `notices_${category}`;
    const DynamicModel = createDynamicModel(collectionName);

    // 데이터 저장
    const notice = new DynamicModel(noticeData);
    await notice.save();
    console.log(`Notice saved to ${collectionName}:`, notice);
  } catch (error) {
    console.error('Error saving notice to category collection:', error);
  }
};

// 공지사항 내용 스크랩
const scrapeNoticeContent = async (link) => {
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

    // dDay 계산 로직
    const datePatterns = [
      /\d{4}\.\s*\d{1,2}\.\s*\d{1,2}\s*~\s*\d{1,2}\.\s*\d{1,2}/g,
      /\d{4}\.\s*\d{1,2}\.\s*\d{1,2}/g,
      /\d{4}년\s*\d{1,2}월\s*\d{1,2}일/g
    ];

    const keywords = [
      '신청기간', '모집기간', '접수기간', '기한', '마감기한', '신청기한', '모집기한',
      '기간', '확인기간', '이의신청기간'
    ];

    const dDayList = [];
    keywords.forEach(keyword => {
      const keywordIndex = extractedText.indexOf(keyword);
      if (keywordIndex !== -1) {
        const contentSubstring = extractedText.substring(keywordIndex, keywordIndex + 500);
        datePatterns.forEach(pattern => {
          const matches = contentSubstring.match(pattern);
          if (matches) {
            matches.forEach(match => {
              console.log('Matched Date:', match);
              const endDate = match.split('~').pop().trim();
              dDayList.push(endDate);
            });
          }
        });
      }
    });

    console.log('dDayList:', dDayList);

    const dDay = dDayList.length > 0 ? dDayList[dDayList.length - 1] : '마감기한 없음';
    console.log(`Final dDay: ${dDay}`);

    return { title, date, views, content, files, dDay, extractedText };
  } catch (error) {
    console.error('Error scraping notice content:', error);
    return {
      title: 'Error',
      date: 'Error',
      views: 'Error',
      content: 'Error',
      files: [],
      dDay: 'Error',
      extractedText: 'Error'
    };
  }
};

// 공지사항 링크에서 공지사항을 스크래핑하고 저장
const scrapeAndSaveNotices = async () => {
  try {
    // noticeLinks 컬렉션에서 모든 링크 조회
    const noticeLinks = await NoticeLink.find({}).exec();
    if (noticeLinks.length === 0) {
      console.log('No notice links found.');
      return;
    }
    
    for (const noticeLink of noticeLinks) {
      const link = noticeLink.link;
      const category = noticeLink.category;

      console.log(`Processing link: ${link}`);

      const noticeData = await scrapeNoticeContent(link);
      await saveNoticeToCategoryCollection(category, noticeData);
    }

    console.log('All notices have been saved to their respective category collections.');
  } catch (error) {
    console.error('Error during notice saving process:', error);
  } finally {
    mongoose.connection.close(); // 종료 처리
  }
};

// MongoDB 연결 및 스크래핑 시작
connectToMongoDB().then(scrapeAndSaveNotices);

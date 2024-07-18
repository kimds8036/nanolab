const mongoose = require('mongoose');
const { fetchPage, cleanContent } = require('./utils'); // fetchPage 및 cleanContent 함수 가져오기

// MongoDB 연결
const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/university_notices');
        // Your code for scraping and saving notices
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
    }
})();


// NoticeLink 모델 정의
const noticeLinkSchema = new mongoose.Schema({
  link: { type: String, required: true },
  category: { type: String, required: true }
});
const NoticeLink = mongoose.model('NoticeLink', noticeLinkSchema);

// 공지사항 모델 정의
const createDynamicModel = (collectionName) => {
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

// 페이지에서 공지사항 내용 스크래핑
const scrapeNoticeContent = async (link) => {
  try {
    const $ = await fetchPage(link);

    const detailInfo = $('span.detail_info_after');
    const date = detailInfo.length > 0 ? $(detailInfo[0]).text().trim() : '날짜 없음';
    console.log(`Date extracted: ${date}`);

    const viewsElement = $('span.detail_info_hit').next('span.detail_info_after');
    const views = viewsElement.length > 0 ? viewsElement.text().trim() : '조회수 없음';
    console.log(`Views extracted: ${views}`);

    const contentElement = $('#board_contents');
    cleanContent($, contentElement);
    let content = contentElement.text() ? contentElement.text().trim() : '내용 없음';
    console.log(`Content extracted: ${content}`);

    // 부제목 제거
    content = content.split('\n').filter(line => !line.startsWith('▣')).join('\n');
    console.log(`Content without subheadings: ${content}`);

    const contentText = content.replace(/[\n\r\t\u0020\u00a0\u3000]/g, ' ');
    const extractedText = contentText.trim();
    console.log(`Extracted Text: ${extractedText}`);

    const files = [];
    $('a[href*="/common/downLoad.do"]').each((index, element) => {
      const url = 'https://m.kku.ac.kr' + $(element).attr('href');
      files.push(url);
    });
    console.log(`Files extracted: ${files}`);

    const dDayList = [];

    const datePatterns = [
      /\d{4}\.\s*\d{1,2}\.\s*\d{1,2}\s*~\s*\d{1,2}\.\s*\d{1,2}\s*\(\w{1,2}\)\s*\d{1,2}:\d{2}/g,
      /\d{4}\.\s*\d{1,2}\.\s*\d{1,2}\s*~\s*\d{1,2}\.\s*\d{1,2}\s*\(\w{1,2}\)/g,
      /\d{4}\.\s*\d{1,2}\.\s*\d{1,2}/g,
      /\d{4}년\s*\d{1,2}월\s*\d{1,2}일/g,
      /\d{1,2}\.\d{1,2}\.\s*\(\w{1,2}\)\s*\d{1,2}:\d{2}/g,
      /\d{4}\.\s*\d{1,2}\.\s*\d{1,2}\s*~\s*\d{1,2}\.\s*\d{1,2}/g
    ];

    const priorityKeywords = [
      '신청기간', '모집기간', '접수기간', '기한', '마감기한', '신청기한', '모집기한'
    ];

    const secondaryKeywords = [
      '기간', '확인기간', '이의신청기간'
    ];

    const extractDates = (text) => {
      const matches = [];
      datePatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(text)) !== null) {
          matches.push(match[0]);
        }
      });
      return matches;
    };

    priorityKeywords.forEach(keyword => {
      const keywordIndex = extractedText.indexOf(keyword);
      if (keywordIndex !== -1) {
        const contentSubstring = extractedText.substring(keywordIndex, keywordIndex + 500);
        const dates = extractDates(contentSubstring);
        dates.forEach(date => {
          const parts = date.split('~').map(part => part.trim().split(' ')[0]);
          if (parts.length > 1) {
            dDayList.push(parts[1]);
          } else if (parts.length === 1) {
            dDayList.push(parts[0]);
          }
        });
      }
    });

    if (dDayList.length === 0) {
      secondaryKeywords.forEach(keyword => {
        const keywordIndex = extractedText.indexOf(keyword);
        if (keywordIndex !== -1) {
          const contentSubstring = extractedText.substring(keywordIndex, keywordIndex + 500);
          const dates = extractDates(contentSubstring);
          dates.forEach(date => {
            const parts = date.split('~').map(part => part.trim().split(' ')[0]);
            if (parts.length > 1) {
              dDayList.push(parts[1]);
            } else if (parts.length === 1) {
              dDayList.push(parts[0]);
            }
          });
        }
      });
    }

    console.log('dDayList:', dDayList);

    const dDay = dDayList.length > 0 ? dDayList[dDayList.length - 1] : '마감기한 없음';
    console.log(`Final dDay: ${dDay}`);

    return { date, views, content, files, dDay, extractedText };
  } catch (error) {
    console.error('Error scraping notice content:', error);
    return {
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
    const noticeLinks = await NoticeLink.find({}).exec(); // exec()를 추가하여 쿼리 실행
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

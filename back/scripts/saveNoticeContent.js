const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { fetchPage, cleanContent } = require('./utils'); // fetchPage 및 cleanContent 함수 가져오기

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  views: { type: String, required: false },
  content: { type: String, required: false },
  files: { type: [String], required: false },
  dDay: { type: String, required: false },
  extractedText: { type: String, required: false },
  category: { type: String, required: true } // 카테고리 추가
});

const Notice = mongoose.model('Notice', noticeSchema);

mongoose.connect('mongodb://localhost:27017/university_notices', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // 5초 후에 서버 선택 타임아웃 설정
});

mongoose.connection.once('open', () => {
  console.log('Successfully connected to MongoDB');
}).on('error', (error) => {
  console.error('Connection error:', error);
});

// 동적 모델 생성 함수
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

const scrapeAndSaveNotices = async () => {
  try {
    // 모든 공지사항을 카테고리별로 조회
    const notices = await Notice.find({});
    const categories = new Set(notices.map(notice => notice.category)); // 카테고리 목록 생성

    // 공지사항을 각 카테고리별 컬렉션에 저장
    for (const notice of notices) {
      await saveNoticeToCategoryCollection(notice.category, notice);
    }

    console.log('All notices have been saved to their respective category collections.');
  } catch (error) {
    console.error('Error during notice saving process:', error);
  } finally {
    mongoose.connection.close();
  }
};

// 페이지 스크레이핑 함수
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

scrapeAndSaveNotices();

require('dotenv').config();
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const { fetchPage } = require('./utils'); 
const moment = require('moment');
const axios = require('axios');

const MONGO_URI = process.env.MONGO_URI;

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

  const allowedTags = ['p', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'span', 'div', 'a' ,'br', 'strong'];
  $element.find('*').each((index, el) => {
    if (!allowedTags.includes(el.tagName.toLowerCase())) {
      $(el).replaceWith($(el).html());
    }
  });
}

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const noticeLinkSchema = new mongoose.Schema({
  link: { type: String, required: true },
  category: { type: String, required: true },
});

const NoticeLink = mongoose.model('NoticeLink', noticeLinkSchema);

const createDynamicModel = (collectionName) => {
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName];
  }
  const schema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    views: { type: String, required: false },
    content: { type: String, required: false },
    files: { type: [String], required: false },
    extractedText: { type: String, required: false },
    deadline: { type: String, required: false },
  });
  return mongoose.model(collectionName, schema, collectionName);
};

const saveOrUpdateNotice = async (category, noticeData) => {
  try {
    const collectionName = `notices_${category}`;
    const DynamicModel = createDynamicModel(collectionName);

    await DynamicModel.updateOne(
      { title: noticeData.title, date: noticeData.date },
      { $set: noticeData },
      { upsert: true }
    );
    console.log(`Notice saved or updated in ${collectionName}:`, noticeData);
  } catch (error) {
    console.error('Error saving or updating notice in category collection:', error);
  }
};

const scrapeAndSaveNotices = async () => {
  await connectToMongoDB();

  try {
    const noticeLinks = await NoticeLink.find({});

    const firstCategory = ['학사공지', '장학공지', '취업/창업공지', '국제/교류공지', '일반공지', '채용공지', '외부행사/공모전'];
    const secondCategoryKeywords = ['학과', '혁신공유대학', '의예과', '유아교육과'];

    for (const noticeLink of noticeLinks) {
      const { link, category } = noticeLink;
      let noticeData;

      const isSecondCategory = secondCategoryKeywords.some(keyword => category.includes(keyword));

      if (isSecondCategory) {
        noticeData = await scrapeSecondCategoryNoticeContent(link);
      } else if (firstCategory.includes(category)) {
        noticeData = await scrapeFirstCategoryNoticeContent(link);
      } else {
        console.warn(`Unrecognized category: ${category}`);
        continue;
      }

      await saveOrUpdateNotice(category, noticeData);
    }
  } finally {
    mongoose.connection.close();
  }
};

const scrapeSecondCategoryNoticeContent = async (link) => {
  try {
    const $ = await fetchPage(link);

    const title = $('table.grid .subject').text().trim() || '제목 없음';
    console.log(`Title extracted: ${title}`);

    const date = $('table.grid th:contains("작성일")').next('td').text().trim() || '날짜 없음';
    console.log(`Date extracted: ${date}`);

    const views = $('table.grid th:contains("조회수")').next('td').text().trim() || '조회수 없음';
    console.log(`Views extracted: ${views}`);

    const contentElement = $('#post_view_txt');
    cleanContent($, contentElement);

    const content = contentElement.html() ? contentElement.html().trim().replace(/[\n\r\t\u0020\u00a0\u3000]/g, ' ') : '내용 없음';
    const extractedText = contentElement.text().replace(/[\n\r\t\u0020\u00a0\u3000]/g, '').trim();
    console.log(`Content extracted: ${content}`);
    console.log(`Extracted Text: ${extractedText}`);

    const files = [];
    $('a[href*="/file/fileDownLoad.do"]').each((index, element) => {
      const fileUrl = new URL($(element).attr('href'), link).href;
      files.push(fileUrl);
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
      extractedText: 'Error',
    };
  }
};

const scrapeFirstCategoryNoticeContent = async (link) => {
  try {
    const $ = await fetchPage(link);

    const title = $('h4').text().trim().replace('제목\t :', '').trim() || '제목 없음';
    console.log(`Title extracted: ${title}`);

    const date = $('span.detail_info_date').next('span.detail_info_after').text().trim() || '날짜 없음';
    console.log(`Date extracted: ${date}`);

    const views = $('span.detail_info_hit').next('span.detail_info_after').text().trim() || '조회수 없음';
    console.log(`Views extracted: ${views}`);

    const contentElement = $('#board_contents');
    cleanContent($, contentElement);

    const content = contentElement.html() ? contentElement.html().trim() : '내용 없음';
    const extractedText = contentElement.text().replace(/[\n\r\t\u0020\u00a0\u3000]/g, '').trim();
    console.log(`Content extracted: ${content}`);
    console.log(`Extracted Text: ${extractedText}`);

    const files = [];
    $('a[href*="/common/downLoad.do"]').each((index, element) => {
      const fileUrl = new URL($(element).attr('href'), 'https://m.kku.ac.kr').href;
      files.push(fileUrl);
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
      extractedText: 'Error',
    };
  }
};

scrapeAndSaveNotices();


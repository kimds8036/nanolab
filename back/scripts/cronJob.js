const cron = require('node-cron');
const scrapeNotices = require('./scrapeNotices');
const removeOldNotices = require('./removeOldNotices');

// 매일 오전 9시와 오후 6시에 스크래핑
cron.schedule('0 9,18 * * *', () => {
  console.log('Scraping notices...');
  scrapeNotices().then(() => {
    console.log('Scraping completed');
  }).catch(err => {
    console.error('Error during scraping', err);
  });
});

// 매주 일요일 자정에 오래된 공지사항 삭제 (예: 30일 이상된 공지사항)
cron.schedule('0 0 * * 0', () => {
  console.log('Removing old notices...');
  removeOldNotices(30).then(() => {
    console.log('Old notices removed');
  }).catch(err => {
    console.error('Error during removing old notices', err);
  });
});

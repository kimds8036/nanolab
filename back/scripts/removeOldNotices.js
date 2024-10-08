const mongoose = require('mongoose');
const Notice = require('../models/Notice');

mongoose.connect('mongodb://localhost:27017/university_notices', { useNewUrlParser: true, useUnifiedTopology: true });

const getNoticesByCategory = async (category) => {
  try {
    const notices = await Notice.find({ category: category });
    console.log(`Notices in category ${category}:`, notices);
  } catch (error) {
    console.error(`Error fetching notices in category ${category}:`, error);
  } finally {
    mongoose.connection.close();
  }
};

async function removeOldNotices(days) {
  const dateThreshold = new Date();
  dateThreshold.setDate(dateThreshold.getDate() - days);

  await Notice.deleteMany({ createdAt: { $lt: dateThreshold } });
  console.log(`Notices older than ${days} days have been removed.`);
}

// 예: 30일 이상된 공지사항을 삭제
removeOldNotices(30).then(() => {
  mongoose.connection.close();
}).catch(err => {
  console.error('Error during removing old notices', err);
  mongoose.connection.close();
});

module.exports = removeOldNotices;

const mongoose = require('mongoose');

const noticeContentSchema = new mongoose.Schema({
  category: String,
  title: String,
  content: String,
  views: Number,
  attachments: [
    {
      filename: String,
      url: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NoticeContent', noticeContentSchema);

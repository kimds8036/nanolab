const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NoticeLink 스키마 정의
const NoticeLinkSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  views: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, required: true } // 공지 유형 필드 추가
});

const NoticeLink = mongoose.model('NoticeLink', NoticeLinkSchema);

module.exports = NoticeLink;

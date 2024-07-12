const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MasscomNotice 스키마 정의
const MasscomNoticeSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  views: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

// MasscomNotice 모델 생성
const MasscomNotice = mongoose.model('MasscomNotice', MasscomNoticeSchema, 'masscom');

module.exports = MasscomNotice;

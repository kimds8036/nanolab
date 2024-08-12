const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// DongwhaNotice 스키마 정의
const DongwhaNoticeSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  views: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

// DongwhaNotice 모델 생성
const DongwhaNotice = mongoose.model('DongwhaNotice', DongwhaNoticeSchema, 'dongwha');

module.exports = DongwhaNotice;

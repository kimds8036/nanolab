const mongoose = require('mongoose');
const { Schema } = mongoose;

// Notice 스키마 정의
const NoticeSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  views: { type: String, required: false },
  content: { type: String, required: false },
  files: { type: [String], required: false },
  dDay: { type: String, required: false },
  extractedText: { type: String, required: false }
});

module.exports = NoticeSchema;

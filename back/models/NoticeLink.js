const mongoose = require('mongoose');

const noticeLinkSchema = new mongoose.Schema({
  category: { type: String, required: true },
  link: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('NoticeLink', noticeLinkSchema);

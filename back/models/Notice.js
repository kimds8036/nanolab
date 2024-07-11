const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the notice schema
const noticeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  attachments: [{
    filename: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }]
});

// Middleware to set the updated_at field before saving
noticeSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Create the model
const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;

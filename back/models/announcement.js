const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the announcement schema
const announcementSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  valid_until: {
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
announcementSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Create the model
const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;

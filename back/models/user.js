const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
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
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: String,
  operatingSystem: String,
  browser: String,
  platform: String,
  referrer: String,
  language: String,
  location: {
    type: String
  }
});

// Middleware to set the updated_at field before saving
userSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;

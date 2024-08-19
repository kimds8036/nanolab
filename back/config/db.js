// db.js
require('dotenv').config({ path: '../.env' });  // 환경 변수 로드

const mongoose = require('mongoose');
console.log('MONGO_URI:', process.env.MONGO_URI);
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;

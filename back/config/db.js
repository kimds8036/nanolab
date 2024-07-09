const mongoose = require('mongoose');
require('dotenv').config();  // .env 파일에서 환경 변수를 로드합니다

// MongoDB URI 가져오기
const uri = process.env.MONGODB_URI;

// Mongoose를 사용하여 MongoDB에 연결
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas', err);
  process.exit(1);  // 연결 실패 시 프로세스를 종료합니다
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB Atlas');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB Atlas');
  });
  
module.exports = mongoose;

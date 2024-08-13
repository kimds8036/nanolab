

const mongoose = require('mongoose');
const uri = 'mongodb+srv://nanolaebmeta:skshfoqapxk2024!@cluster0.vydwyas.mongodb.net/nanolabmeta?retryWrites=true&w=majority&appName=Cluster0';
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB에 성공적으로 연결되었습니다');
  } catch (error) {
    console.error('MongoDB 연결 오류:', error);
  } finally {
    mongoose.disconnect();
  }
};

connectDB();

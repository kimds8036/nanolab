const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });  // .env 파일의 절대경로 설정
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    // Authorization 헤더에서 토큰 가져오기
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization 헤더가 없습니다.' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Received token:', token);

    // 토큰 검증
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', decoded);

    // 사용자가 존재하는지 확인
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    // 사용자 정보를 요청 객체에 추가
    req.user = user;
    next();  // 다음 미들웨어 또는 라우트로 이동
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
  }
};

module.exports = authMiddleware;

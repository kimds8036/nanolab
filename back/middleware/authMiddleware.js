const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    req.user = user;  // 사용자 정보를 요청 객체에 추가
    next();
  } catch (error) {
    res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
  }
};

module.exports = authMiddleware;

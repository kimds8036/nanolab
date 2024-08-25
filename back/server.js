const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const useragent = require('express-useragent');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const moment = require('moment');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/user');
const NoticeLink = require('./models/NoticeLink');
const Notice = require('./models/Notice');

const app = express();
const PORT = process.env.PORT || 5000;
const GEOLOCATION_API_KEY = process.env.GEOLOCATION_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());
app.use(useragent.express());

// MongoDB 연결
connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// 회원가입 라우트
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.useragent.source;
  const operatingSystem = req.useragent.os;
  const browser = req.useragent.browser;
  const platform = req.useragent.platform;
  const referrer = req.headers['referer'] || req.headers['referrer'];
  const language = req.headers['accept-language'];

  console.log(`Received registration request: ${email}, IP: ${ipAddress}`);

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${GEOLOCATION_API_KEY}&ip=${ipAddress}`);
    const location = `${geoResponse.data.country_name}, ${geoResponse.data.city}`;

    const newUser = new User({
      email,
      password: hashedPassword,
      ipAddress,
      userAgent,
      operatingSystem,
      browser,
      platform,
      referrer,
      language,
      location
    });

    await newUser.save();

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 로그인 라우트
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt for email: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Internal server error: JWT_SECRET is not defined' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', token);

    res.status(200).json({ token, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 프로필 조회 라우트
app.get('/auth/profile', authMiddleware, (req, res) => {
  try {
    const { email, location, language, platform } = req.user;
    res.status(200).json({ email, location, language, platform });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile information' });
  }
});

// 비밀번호 변경 라우트
app.post('/auth/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const email = req.user.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: 'Error changing password' });
  }
});

// 공지사항 조회 라우트
app.get('/api/notices_:category', async (req, res) => {
  const { category } = req.params;

  try {
    const collectionName = `notices_${category}`;
    const noticesCollection = mongoose.connection.collection(collectionName);
    const notices = await noticesCollection.find({}).project({ title: 1, date: 1 }).toArray();

    res.json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Server error occurred', error });
  }
});

// 공지사항 검색 및 D-Day 계산 라우트
app.get('/api/noticelinks', async (req, res) => {
  const searchQuery = req.query.query || '';
  console.log(`Search query received: ${searchQuery}`);

  try {
    const filter = searchQuery ? { title: new RegExp(searchQuery, 'i') } : {};
    const notices = await NoticeLink.find(filter);

    const updatedNotices = notices.map(notice => {
      const deadline = extractDeadline(notice.content);
      if (deadline) {
        const dDay = calculateDDay(deadline);
        return { ...notice.toObject(), dDay };
      }
      return notice.toObject();
    });

    res.json(updatedNotices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 공지사항 카테고리별 조회 라우트
app.get('/api/notices/:category', async (req, res) => {
  const { category } = req.params;
  const collectionName = `notices_${category}`;
  console.log(`Fetching notices for category: ${category}`);

  try {
    const notices = await mongoose.connection.db.collection(collectionName).find({}).toArray();
    res.json(notices);
  } catch (error) {
    console.error(`Error fetching notices for category ${category}:`, error);
    res.status(500).json({ message: 'Error fetching notices', error });
  }
});

// D-Day 계산 함수
const extractDeadline = (text) => {
  const deadlinePattern = /(?:기간|신청기간|등록기간|접수기간)\s*:\s*([0-9]{4}\.\s*[0-9]{1,2}\.\s*[0-9]{1,2}\.\(\S+\))\s*~\s*([0-9]{4}\.\s*[0-9]{1,2}\.\s*[0-9]{1,2}\.\(\S+\))/;
  const match = deadlinePattern.exec(text);
  if (match) {
    return match[2];
  }
  return null;
};

const calculateDDay = (deadline) => {
  const endDate = moment(deadline, "YYYY. M. D. (dd)");
  const today = moment();
  const dDay = endDate.diff(today, 'days');
  return dDay;
};

// 사용자 삭제 라우트 추가
app.delete('/auth/delete-user', authMiddleware, async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

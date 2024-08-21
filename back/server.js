const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });  // .env 파일의 절대경로 설정

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

const useragent = require('express-useragent');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const moment = require('moment');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/authMiddleware');  // 추가된 미들웨어 파일 불러오기

const app = express();
const PORT = process.env.PORT || 5000;
const GEOLOCATION_API_KEY = process.env.GEOLOCATION_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());
app.use(useragent.express());

// 데이터베이스 연결
connectDB();

// 루트 경로 핸들러 추가
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

  console.log(`Received registration request: ${email}, ${password}, IP: ${ipAddress}, OS: ${operatingSystem}, Browser: ${browser}, Platform: ${platform}`);

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${GEOLOCATION_API_KEY}&ip=${ipAddress}`);
    const location = geoResponse.data.country_name + ', ' + geoResponse.data.city;

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
console.log('JWT_SECRET:', process.env.JWT_SECRET);
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt for email: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: '아이디와 비밀번호를 확인해 주세요' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: '아이디와 비밀번호를 확인해 주세요' });
    }

    // JWT_SECRET 확인
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Internal server error: JWT_SECRET is not defined' });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', token);

    res.status(200).json({ token, email: user.email });
    // 선택 사항: 토큰을 검증하여 디코딩
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Decoded token:', decoded); // 디코딩된 내용 확인 (선택 사항)
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(500).json({ message: 'Internal server error: JWT verification failed' });
    }

    // 클라이언트에게 토큰과 이메일 반환
    
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
    res.status(500).json({ message: '프로필 정보를 가져오는 중 오류가 발생했습니다.' });
  }
});

// 비밀번호 변경 라우트
app.post('/auth/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const email = req.user.email; // `authMiddleware`가 설정한 사용자 이메일


  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '현재 비밀번호가 일치하지 않습니다.' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    res.status(200).json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: '비밀번호 변경 중 오류가 발생했습니다.' });
  }
});

// 공지사항 검색 및 D-Day 계산 라우트
app.get('/api/notices', async (req, res) => {
  const searchQuery = req.query.q;
  console.log(`Search query received: ${searchQuery}`);
  try {
    const notices = await NoticeLink.find({
      title: new RegExp(searchQuery, 'i')
    });

    const updatedNotices = notices.map(notice => {
      const deadline = extractDeadline(notice.content);
      if (deadline) {
        const dDay = calculateDDay(deadline);
        console.log(`Calculated D-Day for notice "${notice.title}": ${dDay}`);
        return { ...notice.toObject(), dDay };
      }
      return notice.toObject();
    });

    console.log(`Search results: ${updatedNotices.length} notices found`);
    res.json(updatedNotices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// D-Day 계산 함수
const extractDeadline = (text) => {
  const deadlinePattern = /(?:기간|신청기간|등록기간|접수기간)\s*:\s*([0-9]{4}\.\s*[0-9]{1,2}\.\s*[0-9]{1,2}\.\(\S+\))\s*~\s*([0-9]{4}\.\s*[0-9]{1,2}\.\s*[0-9]{1,2}\.\(\S+\))/;
  const match = deadlinePattern.exec(text);
  if (match) {
    console.log('Deadline extracted:', match[2]);
    return match[2];
  }
  return null;
};

const calculateDDay = (deadline) => {
  const endDate = moment(deadline, "YYYY. M. D. (dd)");
  const today = moment();
  const dDay = endDate.diff(today, 'days');
  console.log('Calculated D-Day:', dDay);
  return dDay;
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

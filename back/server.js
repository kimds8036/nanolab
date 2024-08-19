require('dotenv').config();  // 환경 변수 로드
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const useragent = require('express-useragent');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const connectDB = require('./config/db');  // db.js 파일 불러오기

const app = express();
const PORT = process.env.PORT || 5000; // Railway의 기본 포트 5000으로 설정
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

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // IP 주소를 기반으로 위치 정보 조회
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
      location  // 위치 정보 추가
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
  console.log(`Login attempt for email: ${email}`);  // 로그인 시도 로깅

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

    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Internal server error: JWT_SECRET is not defined' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

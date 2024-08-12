const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // 패스워드 해싱을 위한 라이브러리
const User = require('./models/User');
const useragent = require('express-useragent');
const jwt = require('jsonwebtoken');  // 토큰 생성 라이브러리
const axios = require('axios');  // axios 모듈 불러오기
const app = express();
const PORT = 5000;
const GEOLOCATION_API_KEY = '8f73d41d6e8942b8a10d355c00049e4d';  // ipgeolocation.io API 키
const JWT_SECRET = 'your_jwt_secret';  // JWT 비밀키

app.use(cors());
app.use(bodyParser.json());
app.use(useragent.express());

mongoose.connect('mongodb+srv://nanolaebmeta:skshfoqapxk2024!@cluster0.vydwyas.mongodb.net/nanolabmeta?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

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

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const noticeRoutes = require('./routes/notices');

const app = express();

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트
app.use('/auth', authRoutes);
app.use('/notices', noticeRoutes);

module.exports = app;

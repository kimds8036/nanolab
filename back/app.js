const express = require('express');
const app = express();
const mongoose = require('./config/db');  // db.js를 통해 MongoDB에 연결

// 나머지 앱 설정과 라우터 설정

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

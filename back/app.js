const express = require('express');
const mongoose = require('./config/db');  // db.js를 통해 MongoDB에 연결
const User = require('./models/User');

const app = express();

app.get('/test-db', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

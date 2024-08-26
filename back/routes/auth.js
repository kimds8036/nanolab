const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 회원가입 엔드포인트
router.post('/register', authController.register);

// 로그인 엔드포인트
router.post('/login', authController.login);

// 비밀번호 변경 엔드포인트 추가
router.post('/change-password', authController.changePassword);

// 탈퇴 엔드포인트 추가
router.post('/delete-user', authController.deleteUser);

module.exports = router;

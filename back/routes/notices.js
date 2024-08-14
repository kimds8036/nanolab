const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const auth = require('../middleware/auth');

router.get('/', noticeController.getAllNotices);
router.post('/', auth, noticeController.createNotice);
router.put('/:id', auth, noticeController.updateNotice);
router.delete('/:id', auth, noticeController.deleteNotice);

module.exports = router;

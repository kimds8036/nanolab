const Notice = require('../models/Notice');

exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createNotice = async (req, res) => {
  try {
    const { title, content, category, attachments } = req.body;
    const notice = new Notice({ title, content, category, attachments });
    await notice.save();
    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, attachments } = req.body;
    const notice = await Notice.findByIdAndUpdate(id, { title, content, category, attachments, updated_at: Date.now() }, { new: true });
    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    await Notice.findByIdAndDelete(id);
    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

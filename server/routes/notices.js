import express from 'express';
import Notice from '../models/Notice.js';

const router = express.Router();

// GET all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET single notice by ID
router.get('/:noticeId', async (req, res) => {
  const noticeId = req.params.noticeId;
  try {
    const notice = await Notice.findById(noticeId);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.json(notice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST create a new notice
router.post('/', async (req, res) => {
  const { team, text, task, notiType, isRead } = req.body;
  try {
    const newNotice = new Notice({ team, text, task, notiType, isRead });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT update notice by ID
router.put('/:noticeId', async (req, res) => {
  const noticeId = req.params.noticeId;
  const { team, text, task, notiType, isRead } = req.body;
  try {
    const notice = await Notice.findById(noticeId);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    notice.team = team;
    notice.text = text;
    notice.task = task;
    notice.notiType = notiType;
    notice.isRead = isRead;
    await notice.save();
    res.json(notice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE notice by ID
router.delete('/:noticeId', async (req, res) => {
  const noticeId = req.params.noticeId;
  try {
    const notice = await Notice.findById(noticeId);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    await notice.deleteOne();
    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;

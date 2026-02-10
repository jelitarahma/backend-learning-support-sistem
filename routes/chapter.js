const express = require('express');
const router = express.Router();
const { getAllChapters, getChapterDetail, createChapter, updateChapter, deleteChapter } = require('../controllers/chapterController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, getAllChapters);
router.get('/:id', auth, getChapterDetail);
router.post('/', auth, authorize('ADMIN', 'TEACHER'), createChapter);
router.put('/:id', auth, authorize('ADMIN', 'TEACHER'), updateChapter);
router.delete('/:id', auth, authorize('ADMIN', 'TEACHER'), deleteChapter);

module.exports = router;

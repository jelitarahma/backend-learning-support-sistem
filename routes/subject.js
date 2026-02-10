const express = require('express');
const router = express.Router();
const { getAllSubjects, getSubjectDetail, createSubject, updateSubject, deleteSubject } = require('../controllers/subjectController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, getAllSubjects);
router.get('/:id', auth, getSubjectDetail);
router.post('/', auth, authorize('ADMIN', 'TEACHER'), createSubject);
router.put('/:id', auth, authorize('ADMIN', 'TEACHER'), updateSubject);
router.delete('/:id', auth, authorize('ADMIN', 'TEACHER'), deleteSubject);

module.exports = router;

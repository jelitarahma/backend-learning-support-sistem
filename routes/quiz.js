const express = require('express');
const router = express.Router();
const { 
    getAllQuizzes, getQuizDetail, submitAttempt, createQuiz, updateQuiz, deleteQuiz, 
    createQuestion, updateQuestion, deleteQuestion, getQuestionDetail 
} = require('../controllers/quizController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, getAllQuizzes);
router.get('/:id', auth, getQuizDetail);
router.post('/submit', auth, submitAttempt);

// Administrative routes
router.post('/', auth, authorize('ADMIN', 'TEACHER'), createQuiz);
router.put('/:id', auth, authorize('ADMIN', 'TEACHER'), updateQuiz);
router.delete('/:id', auth, authorize('ADMIN', 'TEACHER'), deleteQuiz);

// Question routes
router.get('/questions/:id', auth, authorize('ADMIN', 'TEACHER'), getQuestionDetail);
router.post('/questions', auth, authorize('ADMIN', 'TEACHER'), createQuestion);
router.put('/questions/:id', auth, authorize('ADMIN', 'TEACHER'), updateQuestion);
router.delete('/questions/:id', auth, authorize('ADMIN', 'TEACHER'), deleteQuestion);

module.exports = router;

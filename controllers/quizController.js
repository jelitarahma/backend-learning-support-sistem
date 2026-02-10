const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const QuizAttempt = require('../models/QuizAttempt');

const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find(req.query.materialId ? { materialId: req.query.materialId } : {});
        res.json({ success: true, data: quizzes });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getQuizDetail = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('materialId');
        if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });
        
        const questions = await Question.find({ quizId: quiz._id }).select('-options.isCorrect -explanation');
        
        res.json({ success: true, data: { quiz, questions } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const submitAttempt = async (req, res) => {
    try {
        const { quizId, answers } = req.body; // answers: [{ questionId, selectedOption }]
        const questions = await Question.find({ quizId });
        
        let score = 0;
        const evaluatedAnswers = answers.map(ans => {
            const question = questions.find(q => q._id.toString() === ans.questionId);
            const correctOption = question.options.find(opt => opt.isCorrect);
            const isCorrect = correctOption.optionText === ans.selectedOption;
            
            if (isCorrect) score += question.points;
            
            return {
                questionId: ans.questionId,
                selectedOption: ans.selectedOption,
                isCorrect,
                points: isCorrect ? question.points : 0
            };
        });

        const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);
        const finalScore = (score / totalPoints) * 100;

        const attempt = new QuizAttempt({
            userId: req.user._id,
            quizId,
            score: finalScore,
            status: 'COMPLETED',
            endTime: Date.now(),
            answers: evaluatedAnswers
        });

        await attempt.save();
        res.json({ success: true, data: attempt });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json({ success: true, data: quiz });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });
        res.json({ success: true, data: quiz });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });
        res.json({ success: true, message: 'Quiz deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const createQuestion = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const questions = await Question.insertMany(req.body);
            return res.status(201).json({ success: true, data: questions });
        }
        
        const question = new Question(req.body);
        await question.save();
        res.status(201).json({ success: true, data: question });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) return res.status(404).json({ success: false, message: 'Question not found' });
        res.json({ success: true, data: question });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ success: false, message: 'Question not found' });
        res.json({ success: true, message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getQuestionDetail = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ success: false, message: 'Question not found' });
        res.json({ success: true, data: question });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getAllQuizzes, getQuizDetail, submitAttempt, createQuiz, updateQuiz, deleteQuiz, createQuestion, updateQuestion, deleteQuestion, getQuestionDetail };

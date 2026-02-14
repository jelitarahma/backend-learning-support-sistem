const UserProgress = require('../models/UserProgress');
const QuizAttempt = require('../models/QuizAttempt');
const UserAnalytics = require('../models/UserAnalytics');
const Material = require('../models/Material');
const Subject = require('../models/Subject');
const Quiz = require('../models/Quiz');

const getUserDashboard = async (req, res) => {
    try {
        const isAdminOrTeacher = req.user.role === 'ADMIN' || req.user.role === 'TEACHER';
        
        // If admin/teacher, see everyone's progress; else only see current user's
        const progressQuery = isAdminOrTeacher ? {} : { userId: req.user._id };
        const attemptsQuery = isAdminOrTeacher ? {} : { userId: req.user._id };

        const progress = await UserProgress.find(progressQuery)
            .populate('materialId', 'title type thumbnail')
            .populate('userId', 'fullName username email')
            .sort('-lastAccessedAt')
            .limit(20);
        
        const recentAttempts = await QuizAttempt.find(attemptsQuery)
            .sort('-createdAt')
            .limit(isAdminOrTeacher ? 20 : 5)
            .populate('quizId', 'title')
            .populate('userId', 'fullName username');

        const analytics = await UserAnalytics.find(progressQuery)
            .populate('subjectId', 'title name');

        // Add counts for Admin overview
        const subjectsCount = await Subject.countDocuments();
        const materialsCount = await Material.countDocuments();
        const quizzesCount = await Quiz.countDocuments();

        res.json({
            success: true,
            data: {
                progress,
                recentAttempts,
                analytics,
                subjectsCount,
                materialsCount,
                quizzesCount
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getUserDashboard };

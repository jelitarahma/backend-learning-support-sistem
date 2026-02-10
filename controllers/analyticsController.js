const UserProgress = require('../models/UserProgress');
const QuizAttempt = require('../models/QuizAttempt');
const UserAnalytics = require('../models/UserAnalytics');
const Material = require('../models/Material');

const getUserDashboard = async (req, res) => {
    try {
        const progress = await UserProgress.find({ userId: req.user._id })
            .populate('materialId', 'title type');
        
        const recentAttempts = await QuizAttempt.find({ userId: req.user._id })
            .sort('-createdAt')
            .limit(5)
            .populate('quizId', 'title');

        const analytics = await UserAnalytics.find({ userId: req.user._id })
            .populate('subjectId', 'name');

        res.json({
            success: true,
            data: {
                progress,
                recentAttempts,
                analytics
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getUserDashboard };

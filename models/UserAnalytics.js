const mongoose = require('mongoose');

const userAnalyticsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    totalTimeSpent: { type: Number, default: 0 }, // in seconds
    materialsCompleted: { type: Number, default: 0 },
    quizzesCompleted: { type: Number, default: 0 },
    averageQuizScore: { type: Number, default: 0 },
    lastActivityDate: Date,
    strengthAreas: [String],
    weakAreas: [String]
}, { timestamps: true });

module.exports = mongoose.model('UserAnalytics', userAnalyticsSchema);

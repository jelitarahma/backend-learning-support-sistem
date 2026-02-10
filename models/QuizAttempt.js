const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    startTime: { type: Date, default: Date.now },
    endTime: Date,
    score: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['IN_PROGRESS', 'COMPLETED', 'TIMED_OUT'],
        default: 'IN_PROGRESS'
    },
    answers: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        selectedOption: String,
        isCorrect: Boolean,
        points: Number
    }]
}, { timestamps: true });

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);

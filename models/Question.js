const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    questionText: { type: String, required: true },
    questionType: { 
        type: String, 
        enum: ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'ESSAY'],
        default: 'MULTIPLE_CHOICE'
    },
    options: [{
        optionText: String,
        isCorrect: { type: Boolean, default: false }
    }],
    explanation: String,
    points: { type: Number, default: 10 },
    orderNumber: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);

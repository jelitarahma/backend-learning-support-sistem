const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
    title: { type: String, required: true },
    description: String,
    timeLimit: Number, // in minutes
    passingScore: { type: Number, default: 70 },
    difficulty: { type: String, enum: ['BASIC', 'INTERMEDIATE', 'ADVANCED'] },
    totalQuestions: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
        default: 'DRAFT'
    }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);

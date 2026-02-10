const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
    status: { 
        type: String, 
        enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'],
        default: 'NOT_STARTED'
    },
    progress: { type: Number, default: 0 }, // percentage
    lastAccessedAt: Date,
    completedAt: Date,
    timeSpent: { type: Number, default: 0 } // in seconds
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);

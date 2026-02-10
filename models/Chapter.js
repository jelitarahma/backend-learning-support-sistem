const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    title: { type: String, required: true },
    description: String,
    orderNumber: { type: Number, default: 0 },
    estimatedTime: Number, // in minutes
    difficulty: { 
        type: String, 
        enum: ['BASIC', 'INTERMEDIATE', 'ADVANCED'] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Chapter', chapterSchema);

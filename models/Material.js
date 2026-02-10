const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    title: { type: String, required: true },
    content: String,
    type: { 
        type: String, 
        enum: ['TEXT', 'VIDEO', 'DOCUMENT', 'INTERACTIVE'],
        default: 'TEXT'
    },
    mediaUrl: String,
    orderNumber: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
        default: 'DRAFT'
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    metadata: {
        readTime: Number,
        difficulty: { type: String, enum: ['BASIC', 'INTERMEDIATE', 'ADVANCED'] },
        tags: [String]
    }
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);

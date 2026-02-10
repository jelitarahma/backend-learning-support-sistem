const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, unique: true },
    categoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
    description: String,
    thumbnail: String
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);

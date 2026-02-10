const mongoose = require('mongoose');

const userNoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
    content: { type: String, required: true },
    tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('UserNote', userNoteSchema);

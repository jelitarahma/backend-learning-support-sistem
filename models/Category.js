const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: String,
    thumbnail: String
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);

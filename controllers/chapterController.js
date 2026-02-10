const Chapter = require('../models/Chapter');

const getAllChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find({ subjectId: req.query.subjectId }).sort('orderNumber');
        res.json({ success: true, data: chapters });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getChapterDetail = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id).populate('subjectId');
        if (!chapter) return res.status(404).json({ success: false, message: 'Chapter not found' });
        res.json({ success: true, data: chapter });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const createChapter = async (req, res) => {
    try {
        const chapter = new Chapter(req.body);
        await chapter.save();
        res.status(201).json({ success: true, data: chapter });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!chapter) return res.status(404).json({ success: false, message: 'Chapter not found' });
        res.json({ success: true, data: chapter });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findByIdAndDelete(req.params.id);
        if (!chapter) return res.status(404).json({ success: false, message: 'Chapter not found' });
        res.json({ success: true, message: 'Chapter deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getAllChapters, getChapterDetail, createChapter, updateChapter, deleteChapter };

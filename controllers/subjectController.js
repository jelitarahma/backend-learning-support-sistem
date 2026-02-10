const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');

const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('categoryId');
        res.json({ success: true, data: subjects });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getSubjectDetail = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id).populate('categoryId');
        if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
        
        const chapters = await Chapter.find({ subjectId: subject._id }).sort('orderNumber');
        
        res.json({ 
            success: true, 
            data: { subject, chapters } 
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const createSubject = async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        res.status(201).json({ success: true, data: subject });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
        res.json({ success: true, data: subject });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
        res.json({ success: true, message: 'Subject deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getAllSubjects, getSubjectDetail, createSubject, updateSubject, deleteSubject };

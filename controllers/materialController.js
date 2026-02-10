const Material = require('../models/Material');
const UserProgress = require('../models/UserProgress');

const getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.find({ chapterId: req.query.chapterId })
            .populate('author', 'fullName');
        res.json({ success: true, data: materials });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getMaterialDetail = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id)
            .populate('chapterId')
            .populate('author', 'fullName profilePicture');
        
        if (!material) return res.status(404).json({ success: false, message: 'Material not found' });

        // track or update progress when material is opened
        let progress = await UserProgress.findOne({ 
            userId: req.user._id, 
            materialId: material._id 
        });

        if (!progress) {
            progress = new UserProgress({
                userId: req.user._id,
                materialId: material._id,
                status: 'IN_PROGRESS',
                lastAccessedAt: Date.now()
            });
            await progress.save();
        } else {
            progress.lastAccessedAt = Date.now();
            if (progress.status === 'NOT_STARTED') progress.status = 'IN_PROGRESS';
            await progress.save();
        }

        res.json({ 
            success: true, 
            data: { material, progress } 
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const createMaterial = async (req, res) => {
    try {
        const material = new Material({
            ...req.body,
            author: req.user._id
        });
        await material.save();
        res.status(201).json({ success: true, data: material });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateMaterial = async (req, res) => {
    try {
        const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!material) return res.status(404).json({ success: false, message: 'Material not found' });
        res.json({ success: true, data: material });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteMaterial = async (req, res) => {
    try {
        const material = await Material.findByIdAndDelete(req.params.id);
        if (!material) return res.status(404).json({ success: false, message: 'Material not found' });
        res.json({ success: true, message: 'Material deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const markAsCompleted = async (req, res) => {
    try {
        const progress = await UserProgress.findOneAndUpdate(
            { userId: req.user._id, materialId: req.params.id },
            { 
                status: 'COMPLETED', 
                progress: 100, 
                completedAt: Date.now() 
            },
            { new: true, upsert: true }
        );
        res.json({ success: true, data: progress });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getAllMaterials, getMaterialDetail, createMaterial, updateMaterial, deleteMaterial, markAsCompleted };

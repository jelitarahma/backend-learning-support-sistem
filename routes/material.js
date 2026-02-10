const express = require('express');
const router = express.Router();
const { getAllMaterials, getMaterialDetail, createMaterial, updateMaterial, deleteMaterial, markAsCompleted } = require('../controllers/materialController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, getAllMaterials);
router.get('/:id', auth, getMaterialDetail);
router.post('/', auth, authorize('ADMIN', 'TEACHER'), createMaterial);
router.put('/:id', auth, authorize('ADMIN', 'TEACHER'), updateMaterial);
router.delete('/:id', auth, authorize('ADMIN', 'TEACHER'), deleteMaterial);
router.post('/:id/complete', auth, markAsCompleted);

module.exports = router;

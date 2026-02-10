const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryDetail, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, getAllCategories);
router.get('/:id', auth, getCategoryDetail);
router.post('/', auth, authorize('ADMIN'), createCategory);
router.put('/:id', auth, authorize('ADMIN'), updateCategory);
router.delete('/:id', auth, authorize('ADMIN'), deleteCategory);

module.exports = router;

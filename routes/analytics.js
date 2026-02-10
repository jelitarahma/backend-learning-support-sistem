const express = require('express');
const router = express.Router();
const { getUserDashboard } = require('../controllers/analyticsController');
const { auth } = require('../middleware/auth');

router.get('/dashboard', auth, getUserDashboard);

module.exports = router;

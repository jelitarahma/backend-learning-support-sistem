const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const connectDB = require('./config/db');
connectDB();

// Routes placeholder
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Learning Support System API By Jelita Rahma' });
});

// Import Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const categoryRoutes = require('./routes/category');
app.use('/api/categories', categoryRoutes);

const subjectRoutes = require('./routes/subject');
app.use('/api/subjects', subjectRoutes);

const chapterRoutes = require('./routes/chapter');
app.use('/api/chapters', chapterRoutes);

const materialRoutes = require('./routes/material');
app.use('/api/materials', materialRoutes);

const quizRoutes = require('./routes/quiz');
app.use('/api/quizzes', quizRoutes);

const analyticsRoutes = require('./routes/analytics');
app.use('/api/analytics', analyticsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}

module.exports = app;

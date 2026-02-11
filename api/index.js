const app = require('../app');
const connectDB = require('../config/db');

module.exports = async (req, res) => {
    try {
        await connectDB();
        app(req, res);
    } catch (error) {
        console.error('Vercel API Error:', error);
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
};

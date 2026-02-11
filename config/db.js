const mongoose = require('mongoose');

let cachedDB = null;

const connectDB = async () => {
    if (cachedDB && mongoose.connection.readyState === 1) {
        return cachedDB;
    }

    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        cachedDB = db;
        console.log('MongoDB Connected Successfully');
        return db;
    } catch (error) {
        console.error('MongoDB Connection Error detail:', error.message);
        throw error; // Throw agar tertangkap di log Vercel
    }
};

module.exports = connectDB;

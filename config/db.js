const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGO_URI) {
        return console.log('MONGO_URI is not defined');
    }

    if (isConnected) {
        return console.log('MongoDB is already connected');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "e-learning",
        });

        isConnected = true;
        console.log('MongoDB Connected');
    } catch (error) {
        console.log('MongoDB Connection Error:', error);
    }
};

module.exports = connectDB;

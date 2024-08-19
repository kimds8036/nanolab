// db.js
const mongoose = require('mongoose');

async function connectToMongoDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/university_notices', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectToMongoDB;

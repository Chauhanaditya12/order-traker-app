// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb://127.0.0.1:27017/mydatabase'; // replace 'mydatabase' with your DB name
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected at 127.0.0.1:27017');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// ============================================================================
// 📘 LESSON 02: Introduction to Mongoose
// ============================================================================
//
// 🎯 WHAT IS MONGOOSE?
// --------------------
// While MongoDB is flexible (too flexible!), Mongoose is an ODM 
// (Object Data Modeling) library. It adds "Rules" to your data. 
// It ensures that every user has an email, every product has a price, etc.
//
// 🧠 KEY CONCEPTS:
// 1. SCHEMA: The "Blueprint" or "Plan" for your data.
// 2. MODEL: The "Class" we use to actually interact with the DB.
// ============================================================================

const mongoose = require('mongoose'); // npm install mongoose

// --- 1. CONNECT TO MONGODB ---
// Replace 'localhost' with '127.0.0.1' if you face connection issues
const mongoURI = 'mongodb://127.0.0.1:27017/int222_db';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB!'))
    .catch(err => console.error('❌ Connection Error:', err));

// --- 2. DEFINE A SCHEMA ---
// We define what a 'User' looks like and set validation rules.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    age: {
        type: Number,
        min: 18,
        default: 18
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// --- 3. CREATE A MODEL ---
// The first argument is the singular name of the collection. 
// Mongoose automatically looks for 'users' (lowercase, plural).
const User = mongoose.model('User', userSchema);

module.exports = User; // Export it to use in other files

console.log("=== Mongoose Schema & Model Defined ===\n");

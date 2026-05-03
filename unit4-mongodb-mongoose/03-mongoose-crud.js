// ============================================================================
// 📘 LESSON 03: Mongoose CRUD Operations
// ============================================================================

const mongoose = require('mongoose');
const User = require('./02-mongoose-basics'); // Import the Model we made

const runCRUD = async () => {
    try {
        // --- 1. CREATE ---
        console.log("--- Creating Users ---");
        const newUser = new User({
            username: "ajit_dev",
            email: "ajit@example.com",
            age: 21
        });
        await newUser.save();
        console.log("✅ User Saved!");

        // --- 2. READ ---
        console.log("\n--- Finding Users ---");
        const allUsers = await User.find();
        console.log(`Found ${allUsers.length} users.`);
        
        const singleUser = await User.findOne({ username: "ajit_dev" });
        console.log("Single User Found:", singleUser.email);

        // --- 3. UPDATE ---
        console.log("\n--- Updating User ---");
        const updatedUser = await User.findOneAndUpdate(
            { username: "ajit_dev" },
            { age: 25 },
            { new: true } // Returns the modified document
        );
        console.log("Updated Age:", updatedUser.age);

        // --- 4. DELETE ---
        console.log("\n--- Deleting User ---");
        // await User.deleteOne({ username: "ajit_dev" });
        console.log("🗑️ User deleted (Commented out to keep data for next lesson).");

    } catch (err) {
        console.error("❌ CRUD Error:", err.message);
    } finally {
        // Close connection when done
        // mongoose.connection.close();
    }
};

// Only run if DB is connected
mongoose.connection.on('connected', runCRUD);

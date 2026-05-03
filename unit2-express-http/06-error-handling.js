// ============================================================================
// 📘 LESSON 06: Error Handling in Express
// ============================================================================
//
// 🎯 WHY ERROR HANDLING?
// ----------------------
// Things go wrong: Databases fail, files are missing, or bugs occur. 
// If an error happens, we don't want the server to crash or show the user 
// a scary stack trace. We want a clean, professional error message.
//
// 🧠 THE ERROR MIDDLEWARE:
// Express has a special type of middleware that takes 4 arguments:
// (err, req, res, next)
// ============================================================================

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Error Handling Demo</h1><p>Visit /broken to trigger an error.</p>');
});

// --- 1. TRIGGERING AN ERROR ---
app.get('/broken', (req, res, next) => {
    // We can "throw" an error or pass it to next()
    const err = new Error("Something went wrong in the engine! 💥");
    err.status = 500;
    next(err); // Passing err to next() tells Express to skip to error handler
});

// --- 2. ASYNC ERROR HANDLING ---
app.get('/api/data', async (req, res, next) => {
    try {
        // Imagine a database call that fails
        throw new Error("Database connection failed!");
    } catch (err) {
        next(err); // Send to global error handler
    }
});

// --- 3. THE GLOBAL ERROR HANDLER ---
// This MUST be the very last middleware in your app.
app.use((err, req, res, next) => {
    console.error(`❌ ERROR: ${err.message}`);

    const statusCode = err.status || 500;
    
    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message,
            status: statusCode
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Error Demo running at http://localhost:${PORT}`);
});

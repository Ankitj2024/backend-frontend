// ============================================================================
// 📘 LESSON 01: Understanding Middlewares
// ============================================================================
//
// 🎯 WHAT IS MIDDLEWARE?
// ----------------------
// Middleware is a function that sits BETWEEN the Request and the Response. 
// It has access to `req` and `res`, and a special function called `next`.
//
// 🍳 ANALOGY: Airport Security ✈️
// -------------------------------
// 1. You (The Request) want to get to the Plane (The Final Route).
// 2. You must go through several checkpoints (Middlewares):
//    - Checkpoint 1: Ticket check (Authentication)
//    - Checkpoint 2: Luggage scan (Validation)
//    - Checkpoint 3: Passport stamp (Logging)
// 3. If you pass a checkpoint, the guard says "Next!" and you move forward.
// 4. If you fail, the guard sends you back (Response Error).
// ============================================================================

const express = require('express');
const app = express();

// --- 1. CUSTOM GLOBAL MIDDLEWARE ---
// This runs for EVERY request because we use `app.use()`
app.use((req, res, next) => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${req.method} request to ${req.url}`);
    
    // CRITICAL: You MUST call next() or the request will hang!
    next(); 
});

// --- 2. SPECIFIC ROUTE MIDDLEWARE ---
const checkAdmin = (req, res, next) => {
    const isAdmin = req.query.admin === 'true';
    if (isAdmin) {
        next(); // Proceed to the route
    } else {
        res.status(403).send('<h1>Access Denied: Admins Only! ❌</h1>');
    }
};

// --- 3. USING MIDDLEWARE IN ROUTES ---
app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>');
});

// This route uses the 'checkAdmin' middleware
app.get('/dashboard', checkAdmin, (req, res) => {
    res.send('<h1>Welcome to the Secret Admin Dashboard 🔐</h1>');
});

// --- 4. app.all() ---
// This runs for any HTTP method (GET, POST, PUT, DELETE) at a specific path
app.all('/secret', (req, res) => {
    res.send('This is a secret place, regardless of the method used.');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Middleware Demo running at http://localhost:${PORT}`);
});

// ============================================================================
// 🏃 HOW TO TEST:
// 1. Visit http://localhost:3000/dashboard (Access Denied)
// 2. Visit http://localhost:3000/dashboard?admin=true (Access Granted)
// ============================================================================

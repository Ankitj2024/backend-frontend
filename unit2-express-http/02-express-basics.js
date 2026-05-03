// ============================================================================
// 📘 LESSON 02: Introducing Express.js
// ============================================================================
//
// 🎯 WHAT IS EXPRESS.JS?
// ----------------------
// Express is a "minimalist and flexible web application framework" for Node.js.
// It is the most popular way to build web servers today.
//
// 🧠 WHY USE EXPRESS INSTEAD OF RAW HTTP?
// ----------------------------------------
// | Feature         | Raw HTTP Module (Lesson 01) | Express.js (Lesson 02)    |
// |-----------------|-----------------------------|---------------------------|
// | Routing         | Complex `if/else` blocks    | Simple `app.get()`, etc.  |
// | Middlewares     | Hard to implement           | Built-in support          |
// | Static Files    | Manual reading (complex)    | One line: `express.static`|
// | Response Types  | Manual Headers              | Automatic (res.send, json)|
//
// 🍳 ANALOGY: Manual vs. Automatic Car
// -------------------------------------
// Raw HTTP is like a manual car: You have to control every gear, every turn, 
// and every detail.
// Express is like an automatic car: It handles the difficult internal parts, 
// letting you focus on the DESTINATION (your app's logic).
// ============================================================================

const express = require('express');
const app = express(); // Create an Express Application

// --- 1. BASIC ROUTING ---
// app.METHOD(PATH, CALLBACK)

app.get('/', (req, res) => {
    // res.send() automatically sets Content-Type to HTML
    res.send('<h1>Hello from Express! 🚀</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1><p>Express makes routing so easy!</p>');
});

// --- 2. SENDING JSON ---
app.get('/api/user', (req, res) => {
    // res.json() automatically converts object to JSON string 
    // AND sets Content-Type to application/json
    res.json({
        id: 101,
        name: "Ajit",
        role: "Student"
    });
});

// --- 3. URL PARAMETERS (Dynamic Routing) ---
// Use ':' to define a variable part of the URL
app.get('/hello/:name', (req, res) => {
    const userName = req.params.name;
    res.send(`<h1>Hello, ${userName}! 👋</h1>`);
});

// --- 4. 404 HANDLING ---
// This must be the LAST route. If no routes match, it falls here.
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Express Server running at http://localhost:${PORT}`);
});

// ============================================================================
// ⚠️ IMPORTANT: Before running this, you must install Express:
//    Run this in terminal: npm install
// ============================================================================
// 🏃 HOW TO RUN: node 02-express-basics.js

// ============================================================================
// 📘 LESSON 01: The HTTP Module (Creating a Raw Server)
// ============================================================================
//
// 🎯 WHAT IS THE HTTP MODULE?
// ---------------------------
// Node.js comes with a built-in 'http' module that allows it to transfer data 
// over the HyperText Transfer Protocol (HTTP). This is what makes Node.js 
// a "Web Server".
//
// 🧠 KEY OBJECTS:
// 1. REQUEST (req)  : Information COMING from the user (URL, headers, data).
// 2. RESPONSE (res) : Information we SEND BACK to the user (HTML, JSON, status).
//
// 🍳 ANALOGY: The Post Office
// ---------------------------
// 1. User sends a letter (Request) to a specific address (URL).
// 2. The Postman (HTTP Server) receives it.
// 3. You (The Developer) read the letter, decide what to do.
// 4. You send a reply letter (Response) back.
// ============================================================================

const http = require('http');

// --- 1. SETTING UP THE SERVER ---
const server = http.createServer((req, res) => {
    // This callback function runs EVERY TIME someone visits our server.
    
    console.log(`📩 Received a ${req.method} request for: ${req.url}`);

    // --- 2. BASIC ROUTING ---
    // We check the URL to decide what to show the user.
    
    if (req.url === '/') {
        // Setting Response Headers (Tells browser we are sending HTML)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to the Home Page! 🏠</h1>');
    } 
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Us ℹ️</h1><p>We are learning Advanced Node.js!</p>');
    } 
    else if (req.url === '/api/data') {
        // Sending JSON data (Common for APIs)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const data = {
            course: "INT222",
            topic: "HTTP Module",
            status: "Success"
        };
        res.end(JSON.stringify(data));
    } 
    else {
        // --- 3. STATUS CODES (404 Not Found) ---
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Error</h1><p>Page not found!</p>');
    }
});

// --- 4. LISTENING ON A PORT ---
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log("Press Ctrl+C to stop the server.");
});

// ============================================================================
// ❌ COMMON MISTAKES:
// 1. Forgetting res.end(): The browser will just "spin" forever and never finish.
// 2. Writing headers AFTER res.end(): This will throw an error.
// 3. Not handling routes: Showing the same thing for every URL.
// ============================================================================
// 🏃 HOW TO RUN: 
// 1. Run: node 01-http-module.js
// 2. Open your browser and go to http://localhost:3000

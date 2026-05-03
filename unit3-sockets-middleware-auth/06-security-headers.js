// ============================================================================
// 📘 LESSON 06: Security Headers (Helmet)
// ============================================================================
//
// 🎯 WHY SECURITY HEADERS?
// ------------------------
// Browsers have many built-in security features, but they need the server 
// to tell them which ones to use. 
// For example: 
// - "Don't allow my site to be put in an <iframe>" (prevents Clickjacking)
// - "Only allow HTTPS" (HSTS)
// - "Disable XSS filtering"
//
// `helmet` is a collection of 15 smaller middleware functions that set 
// these HTTP response headers automatically.
// ============================================================================

const express = require('express');
const helmet = require('helmet'); // npm install helmet

const app = express();

// --- 1. USE HELMET ---
// By default, helmet sets security-related HTTP headers for you.
app.use(helmet());

// To see the difference, check the "Network" tab in your browser's 
// Developer Tools. Look at the 'Response Headers'.

app.get('/', (req, res) => {
    res.send('<h1>Security Demo</h1><p>This site is protected by Helmet 🛡️</p>');
});

// --- 2. DISABLE SPECIFIC HEADERS ---
// By default, Express reveals it is running on Node.js via 'X-Powered-By' header.
// This is a security risk because hackers know what to target.
// Helmet removes it, or you can do it manually:
// app.disable('x-powered-by');

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Security Demo running at http://localhost:${PORT}`);
});

// ============================================================================
// 🏃 HOW TO TEST:
// 1. Visit the site.
// 2. Open Developer Tools (F12) -> Network Tab.
// 3. Click the request for 'localhost'.
// 4. Look for headers like 'Content-Security-Policy', 'X-Frame-Options', etc.
// ============================================================================

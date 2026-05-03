// ============================================================================
// 📘 LESSON 02: Cookies and Sessions
// ============================================================================
//
// 🎯 HTTP IS STATELESS
// -------------------
// By default, a server "forgets" who you are as soon as the request ends. 
// To "remember" users (e.g., for Login), we use Cookies and Sessions.
//
// 1. COOKIES: Small pieces of data stored in the USER'S browser.
// 2. SESSIONS: Data stored on the SERVER, linked to a specific user via 
//    a unique ID (usually stored in a cookie).
//
// 🍳 ANALOGY: The Membership Card
// ------------------------------
// - Cookie: You carry a card in your wallet.
// - Session: The shop has a notebook with your name. When you show the card, 
//   they look up your details in the notebook.
// ============================================================================

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// --- 1. SETUP MIDDLEWARE ---
app.use(cookieParser()); // Parses cookies from the browser
app.use(session({
    secret: 'my-super-secret-key', // Used to sign the session ID cookie
    resave: false,                 // Don't save session if unmodified
    saveUninitialized: true,       // Save new sessions even if empty
    cookie: { maxAge: 60000 }      // Session expires in 60 seconds (1 min)
}));

// --- 2. WORKING WITH COOKIES ---
app.get('/set-cookie', (req, res) => {
    // Setting a cookie: (name, value, options)
    res.cookie('theme', 'dark', { httpOnly: true });
    res.send('Theme cookie has been set! 🍪');
});

app.get('/get-cookie', (req, res) => {
    // Reading cookies
    const theme = req.cookies.theme;
    res.send(`Current theme: ${theme || 'Default'}`);
});

// --- 3. WORKING WITH SESSIONS ---
app.get('/visit', (req, res) => {
    // We can store data in req.session
    if (req.session.views) {
        req.session.views++;
        res.send(`<h1>Welcome back!</h1><p>You have visited this page ${req.session.views} times.</p>`);
    } else {
        req.session.views = 1;
        res.send(`<h1>Welcome!</h1><p>This is your first visit.</p>`);
    }
});

app.get('/logout', (req, res) => {
    // Destroying a session
    req.session.destroy((err) => {
        if (err) return res.send('Error logging out.');
        res.send('You have been logged out. Session destroyed. 💨');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Session Demo running at http://localhost:${PORT}`);
});

// ============================================================================
// ⚠️ PREREQUISITES:
// npm install cookie-parser express-session
// ============================================================================
// 🏃 HOW TO TEST:
// 1. Visit /visit multiple times to see the counter increase.
// 2. Visit /logout and then /visit to see it reset.
// ============================================================================

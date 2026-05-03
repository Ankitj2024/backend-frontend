// ============================================================================
// 📘 LESSON 05: JWT (JSON Web Tokens) & RBAC
// ============================================================================
//
// 🎯 WHAT IS JWT?
// ---------------
// JWT is a safe way to share "Claims" between two parties. 
// When you login, the server sends you a "Digital Passport" (Token). 
// You send this token in the header of every future request. 
// The server doesn't need to check its database every time; it just checks 
// the signature of the token.
//
// 🎯 WHAT IS RBAC?
// ----------------
// Role-Based Access Control. It means checking if the user's Role 
// (e.g., 'admin' or 'customer') allows them to perform an action.
// ============================================================================

const express = require('express');
const jwt = require('jsonwebtoken'); // npm install jsonwebtoken

const app = express();
app.use(express.json());

const SECRET_KEY = 'secret-key-12345'; // Keep this safe in real life!

// --- 1. MOCK LOGIN (Generating Token) ---
app.post('/login', (req, res) => {
    const { username, role } = req.body;

    // In real life, you'd check username/password in a DB here.
    // We create a token with a 'payload' (user data)
    const payload = { username, role };
    
    // Sign the token with our secret key
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: "Login Successful!", token });
});

// --- 2. THE AUTH MIDDLEWARE (Verification) ---
const authenticateToken = (req, res, next) => {
    // Tokens are usually sent in the 'Authorization' header: "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Access Denied: No Token!" });

    // Verify the token signature
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or Expired Token!" });
        
        req.user = user; // Add decoded user info to the request object
        next();
    });
};

// --- 3. THE RBAC MIDDLEWARE ---
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Forbidden: Only ${roles.join(' or ')} allowed!` });
        }
        next();
    };
};

// --- 4. PROTECTED ROUTES ---
app.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}`, data: req.user });
});

// Route only for Admins
app.get('/admin-only', authenticateToken, authorizeRoles(['admin']), (req, res) => {
    res.json({ message: "Welcome Boss! You are in the Admin Zone. 😎" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Auth Demo running at http://localhost:${PORT}`);
});

// ============================================================================
// 🏃 HOW TO TEST:
// 1. POST to /login with {"username": "ajit", "role": "admin"} to get a token.
// 2. GET /profile using the token in the 'Authorization' header.
// 3. Try /admin-only with a 'customer' role token to see it blocked.
// ============================================================================

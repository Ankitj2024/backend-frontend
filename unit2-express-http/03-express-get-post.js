// ============================================================================
// 📘 LESSON 03: GET vs POST (Handling Data)
// ============================================================================
//
// 🎯 GET vs POST:
// ---------------
// 1. GET: Used to FETCH data. Data is visible in the URL (Query Parameters).
//    Example: google.com/search?q=nodejs
//
// 2. POST: Used to SEND/SUBMIT data. Data is hidden in the "Request Body".
//    Example: Login form, creating a new user.
//
// 🧠 MIDDLEWARE: 
// To read data from a POST request, we need "Middleware" to parse the body.
// Express provides `express.json()` and `express.urlencoded()` built-in.
// ============================================================================

const express = require('express');
const app = express();

// --- 1. BODY PARSER MIDDLEWARE ---
// This allows us to read `req.body`
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing HTML form data

// --- 2. HANDLING GET REQUESTS (Query Params) ---
// URL: http://localhost:3000/search?term=javascript&page=1
app.get('/search', (req, res) => {
    const term = req.query.term; // Read ?term=...
    const page = req.query.page; // Read &page=...
    
    res.json({
        message: "Search Results",
        searchingFor: term,
        onPage: page
    });
});

// --- 3. HANDLING POST REQUESTS (Request Body) ---
// We use 'app.post' instead of 'app.get'
app.post('/register', (req, res) => {
    // Data is found in req.body thanks to the middleware above
    const { username, email, password } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: "Missing username or email!" });
    }

    console.log(`👤 New Registration: ${username} (${email})`);

    res.status(201).json({
        message: "User registered successfully!",
        data: { username, email }
    });
});

// --- 4. QUICK FORM DEMO (GET request to show HTML) ---
app.get('/login', (req, res) => {
    res.send(`
        <h2>Login Form</h2>
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required><br><br>
            <input type="password" name="password" placeholder="Password" required><br><br>
            <button type="submit">Login</button>
        </form>
    `);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.send(`<h1>Welcome back, ${username}! 🎉</h1>`);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// ============================================================================
// 🏃 HOW TO TEST:
// 1. GET: Visit http://localhost:3000/search?term=node
// 2. POST (Form): Visit http://localhost:3000/login
// 3. POST (JSON): Use a tool like Postman or VS Code Thunder Client 
//    to send a POST request to /register with a JSON body.
// ============================================================================

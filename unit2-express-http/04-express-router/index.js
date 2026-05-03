// ============================================================================
// 📘 LESSON 04B: Using express.Router in Main App
// ============================================================================

const express = require('express');
const app = express();

// 1. Import our route modules
const userRoutes = require('./userRoutes');

// 2. Mount the routers
// Every route inside userRoutes.js now starts with /users
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Express Router Demo</h1><p>Visit /users to see the router in action.</p>');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Router Demo running at http://localhost:${PORT}`);
});

// ============================================================================
// 🏃 HOW TO TEST:
// 1. Visit http://localhost:3000/users
// 2. Visit http://localhost:3000/users/42
// ============================================================================

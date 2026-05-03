// ============================================================================
// 📘 LESSON 04A: express.Router (Modular Routing)
// ============================================================================
//
// 🎯 WHAT IS express.Router?
// ---------------------------
// As your app grows, putting 100 routes in one file becomes a nightmare. 
// `express.Router` lets you split your routes into separate files.
//
// 🍳 ANALOGY: A Large Building
// ----------------------------
// Instead of one giant room, a building has separate sections: 
// The Cafeteria, The Gym, The Offices. 
// Each section has its own doors (routes).
// ============================================================================

const express = require('express');
const router = express.Router(); // Create a router object

// These routes will be relative to whatever path we mount this router on.
// If we mount it on '/users', then '/' is actually '/users/'

// GET /users/
router.get('/', (req, res) => {
    res.json({ message: "List of all users" });
});

// GET /users/:id
router.get('/:id', (req, res) => {
    res.json({ message: `Fetching data for user ID: ${req.params.id}` });
});

// POST /users/
router.post('/', (req, res) => {
    res.json({ message: "Creating a new user" });
});

module.exports = router; // Export the router so we can use it in main app

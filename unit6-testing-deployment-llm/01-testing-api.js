// ============================================================================
// 📘 LESSON 01: Testing REST APIs (Jest & Supertest)
// ============================================================================
//
// 🎯 WHY TEST?
// ------------
// You don't want to manually click buttons every time you change a line of 
// code. Testing allows you to write "code that checks your code".
//
// 🧠 TOOLS:
// 1. Jest: The testing framework (runs the tests).
// 2. Supertest: A library to "fake" HTTP requests to your Express app.
// ============================================================================

const request = require('supertest');
const express = require('express');

// --- 1. CREATE A SIMPLE APP TO TEST ---
const app = express();
app.get('/api/greet', (req, res) => {
    res.status(200).json({ message: "Hello, World!" });
});

// --- 2. THE TEST SUITE ---
// In a real project, this would be in a file like `app.test.js`
/*
describe('GET /api/greet', () => {
    
    it('should return 200 OK and a hello message', async () => {
        const response = await request(app).get('/api/greet');
        
        // Assertions (The "Checks")
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Hello, World!");
    });

    it('should return 404 for unknown routes', async () => {
        const response = await request(app).get('/api/unknown');
        expect(response.statusCode).toBe(404);
    });
});
*/

console.log("=== Testing Logic (Jest/Supertest) Explained ===\n");
console.log("Run tests using: 'npm test'");

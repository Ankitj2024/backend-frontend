// ============================================================================
// 📘 LESSON 05: Express Validator (Input Validation)
// ============================================================================
//
// 🎯 WHY VALIDATE?
// ----------------
// NEVER trust user input! Users (or hackers) might send invalid emails, 
// empty passwords, or malicious scripts. 
// `express-validator` is a library that helps check if the data is correct 
// BEFORE we process it.
//
// ============================================================================

const express = require('express');
const { body, validationResult } = require('express-validator'); // Import tools

const app = express();
app.use(express.json());

// --- 1. DEFINE VALIDATION RULES ---
// We pass validation rules as an ARRAY of middlewares
const registerValidation = [
    body('email')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(), // Sanitizer: converts to lowercase, removes dots etc.
    
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    
    body('username')
        .notEmpty().withMessage('Username is required')
        .trim() // Sanitizer: removes whitespace from start and end
];

// --- 2. APPLY VALIDATION TO A ROUTE ---
app.post('/register', registerValidation, (req, res) => {
    
    // --- 3. CHECK FOR ERRORS ---
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // If there are errors, return them to the user
        return res.status(400).json({ 
            success: false,
            errors: errors.array() 
        });
    }

    // If we reach here, the data is VALID
    const { email, username } = req.body;
    
    res.json({
        success: true,
        message: "Registration successful!",
        user: { email, username }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Validation Demo running at http://localhost:${PORT}`);
});

// ============================================================================
// 🏃 HOW TO TEST:
// Send a POST request to /register with invalid data (e.g., short password or 
// bad email) and see the detailed error response.
// ============================================================================

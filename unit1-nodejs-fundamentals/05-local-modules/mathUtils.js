// ============================================================================
// 📘 LESSON 05A: LOCAL MODULES — Creating Your Own Modules
// ============================================================================
//
// 🎯 WHAT ARE LOCAL MODULES?
// ---------------------------
// Local modules are JavaScript files that YOU create in your project.
// You can split your code into multiple files and share functionality
// between them using `module.exports` and `require()`.
//
// 🍳 ANALOGY:
// -----------
// Think of your project as a restaurant.
// - Core modules = Kitchen appliances that came with the building (oven, fridge)
// - Third-party modules = Equipment you ordered online (food processor)
// - Local modules = Recipes YOU wrote on paper (your own creations!)
//
// 🧠 HOW IT WORKS:
// -----------------
// File A wants to use functions from File B?
//   1. In File B: EXPORT the functions using `module.exports`
//   2. In File A: IMPORT them using `require("./fileB")`
//
// The `./` means "look in the current directory". Without it, Node thinks
// you're looking for a core module or node_modules package.
//
// ============================================================================

// This file is the MATH UTILITY MODULE.
// It defines reusable math functions that other files can import.

// --- Method 1: Exporting individual functions ---

/**
 * Adds two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
    return a + b;
}

/**
 * Subtracts second number from first
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiplies two numbers
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Divides first number by second
 * @throws {Error} If b is zero
 */
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero!");
    }
    return a / b;
}

// --- A constant that we also want to export ---
const PI = 3.14159265358979;

// ============================================================================
// 🔑 THE KEY CONCEPT: module.exports
// ============================================================================
//
// `module.exports` is a special object in Node.js.
// Whatever you ASSIGN to it becomes available to other files that require() this file.
//
// You can export:
//   - A single function:   module.exports = add;
//   - An object of functions: module.exports = { add, subtract };
//   - A class:             module.exports = class Calculator { ... };
//   - A single value:      module.exports = 42;
//
// ============================================================================

// We'll export an OBJECT containing all our functions and constants
module.exports = {
    add,          // Same as: add: add  (ES6 shorthand)
    subtract,
    multiply,
    divide,
    PI
};

// ============================================================================
// 💡 ALTERNATIVE EXPORT STYLES:
// ============================================================================
//
// Style 1: Export one thing at a time using `exports` (shorthand)
//   exports.add = function(a, b) { return a + b; };
//   exports.subtract = function(a, b) { return a - b; };
//
// Style 2: Export a single function (the module IS the function)
//   module.exports = function add(a, b) { return a + b; };
//
// Style 3: Export a class
//   module.exports = class Calculator {
//       add(a, b) { return a + b; }
//   };
//
// ⚠️ IMPORTANT: `module.exports` and `exports` are NOT the same!
//   - `exports` is a REFERENCE (shortcut) to `module.exports`
//   - If you do `exports = something`, it BREAKS the reference!
//   - Always use `module.exports` when exporting a single item.
//   - You CAN use `exports.propertyName` to add properties.
// ============================================================================

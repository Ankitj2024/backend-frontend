// ============================================================================
// 📘 LESSON 05C: LOCAL MODULES — Using (Importing) Your Modules
// ============================================================================
//
// This is the MAIN file that IMPORTS and USES the modules we created.
//
// 🔑 KEY RULE:
// When requiring LOCAL modules, you MUST use a relative path starting with:
//   ./   → current directory
//   ../  → parent directory
//
// Without ./ or ../, Node thinks you want a core module or node_modules package.
//
// ============================================================================

// --- Import our local modules ---
const math = require("./mathUtils");       // Imports the object from mathUtils.js
const strUtils = require("./stringUtils"); // Imports the object from stringUtils.js

// Note: .js extension is OPTIONAL in require(). Node adds it automatically.

console.log("=== Using Local Modules ===\n");

// --- Using mathUtils ---
console.log("--- Math Utilities ---");
console.log("add(10, 5):", math.add(10, 5));             // 15
console.log("subtract(10, 5):", math.subtract(10, 5));   // 5
console.log("multiply(10, 5):", math.multiply(10, 5));   // 50
console.log("divide(10, 5):", math.divide(10, 5));       // 2
console.log("PI:", math.PI);                              // 3.14159...

// --- Using destructuring to import specific functions ---
const { add, multiply } = require("./mathUtils");
console.log("\nUsing destructured imports:");
console.log("add(100, 200):", add(100, 200));         // 300
console.log("multiply(7, 8):", multiply(7, 8));       // 56

// --- Error handling with divide ---
try {
    console.log("\nTrying to divide by zero...");
    math.divide(10, 0);
} catch (error) {
    console.log("Caught Error:", error.message);  // "Cannot divide by zero!"
}

// --- Using stringUtils ---
console.log("\n--- String Utilities ---");
console.log("capitalize('hello'):", strUtils.capitalize("hello"));     // Hello
console.log("reverse('hello'):", strUtils.reverse("hello"));           // olleh
console.log("countWords('Hello World Today'):", strUtils.countWords("Hello World Today")); // 3
console.log("truncate('This is a very long sentence that needs truncating', 20):");
console.log("  ", strUtils.truncate("This is a very long sentence that needs truncating", 20));
// This is a very long ...

// ============================================================================
// 🧪 EXERCISE FOR YOU:
// ============================================================================
// 1. Create a new file called `dateUtils.js` in this folder
// 2. Export these functions from it:
//    - getToday() → returns today's date as a string like "03-May-2026"
//    - daysUntil(dateString) → returns how many days until that date
//    - isWeekend() → returns true if today is Saturday or Sunday
// 3. Import and use them in this file (index.js)
// ============================================================================

// ============================================================================
// ❌ COMMON MISTAKES:
// ============================================================================
// 1. Forgetting the "./" prefix when requiring local files:
//    ❌ require("mathUtils")     → Node looks in node_modules, NOT your folder!
//    ✅ require("./mathUtils")   → Node looks in the CURRENT directory
//
// 2. Overwriting module.exports AND using exports:
//    ❌ module.exports = { add };
//       exports.subtract = subtract;  → This WON'T work! module.exports already replaced.
//
// 3. Circular dependencies (A requires B, B requires A):
//    → This CAN work in Node but leads to confusing bugs. Avoid it!
//
// 4. Forgetting that require() CACHES modules:
//    → The first time you require() a file, Node runs it and caches the result.
//    → Subsequent require() calls return the CACHED version (faster, no re-execution).
// ============================================================================
//
// 🏃 HOW TO RUN: cd 05-local-modules && node index.js
// ============================================================================

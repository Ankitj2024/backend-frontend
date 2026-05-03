// ============================================================================
// 📘 LESSON 07: Callbacks in Node.js
// ============================================================================
//
// 🎯 WHAT IS A CALLBACK?
// A callback is a FUNCTION passed to another function as an argument,
// to be executed LATER (after some operation completes).
// "Here's a function. Call it BACK when you're done."
//
// 🍳 ANALOGY: Ordering Pizza — You give your phone number (callback).
// The pizza shop calls you BACK when pizza is ready.
// ============================================================================

console.log("=== Callbacks in Node.js ===\n");

// --- PART 1: Synchronous Callbacks ---
const fruits = ["Apple", "Banana", "Cherry"];
fruits.forEach(function(fruit, index) {
    console.log(`  ${index + 1}. ${fruit}`);
});

const doubled = [1, 2, 3].map(num => num * 2);
console.log("map callback:", doubled); // [2, 4, 6]

// --- PART 2: Custom Function with Callback ---
function greetUser(name, callback) {
    const greeting = `Hello, ${name}!`;
    callback(greeting);
}

greetUser("Alice", (msg) => console.log(msg));

// --- PART 3: Asynchronous Callbacks ---
console.log("\n1. Before setTimeout");
setTimeout(() => console.log("3. Inside setTimeout (2s later)"), 2000);
console.log("2. After setTimeout (runs BEFORE timeout!)");

// --- PART 4: Error-First Callback Pattern (CRITICAL in Node.js) ---
// Convention: callback(error, result)
//   First param = ERROR (null if success)
//   Second param = RESULT

const fs = require("fs");

fs.readFile(__filename, "utf8", function(err, data) {
    if (err) {
        console.log("Error:", err.message);
        return;
    }
    console.log("\n✅ Read this file! Size:", data.length, "chars");
});

// --- PART 5: Callback Hell (The Problem) ---
// Nested callbacks create a "pyramid of doom":
setTimeout(() => {
    console.log("\n  Step 1: Connected");
    setTimeout(() => {
        console.log("    Step 2: Fetched data");
        setTimeout(() => {
            console.log("      Step 3: Processed");
            console.log("      ✅ Done! (But this nesting is ugly!)");
        }, 300);
    }, 300);
}, 300);
// SOLUTION: Promises & async/await (Lesson 12)

// ============================================================================
// ❌ COMMON MISTAKES:
// 1. Not checking `err` FIRST in error-first callbacks
// 2. Forgetting `return` after error handling
// 3. Trying to use return value of async function (it's undefined!)
// 4. Nesting too deep → Use Promises/async-await instead
// ============================================================================
// 🏃 HOW TO RUN: node 07-callbacks.js

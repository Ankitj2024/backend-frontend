// ============================================================================
// 📘 LESSON 01: INTRODUCING NODE.JS — Your Very First Node.js Program
// ============================================================================
//
// 🎯 WHAT IS NODE.JS?
// --------------------
// For years, JavaScript could ONLY run inside a web browser (Chrome, Firefox, etc.).
// Node.js changed everything. It is a "runtime environment" that lets you run
// JavaScript OUTSIDE the browser — directly on your computer, server, or cloud.
//
// 🔧 HOW DOES IT WORK?
// ---------------------
// Google Chrome uses an engine called "V8" to execute JavaScript.
// Ryan Dahl (creator of Node.js) took the V8 engine OUT of Chrome
// and wrapped it with extra capabilities (file access, networking, etc.).
// That wrapper = Node.js.
//
// 🧠 KEY CHARACTERISTICS OF NODE.JS:
// -----------------------------------
// 1. SINGLE-THREADED    → Uses one main thread (but delegates heavy work)
// 2. EVENT-DRIVEN       → Responds to events (like "file finished reading")
// 3. NON-BLOCKING I/O   → Doesn't wait; moves to the next task immediately
// 4. CROSS-PLATFORM     → Runs on Windows, macOS, Linux
//
// 🍳 ANALOGY: THE CHEF IN A KITCHEN
// ----------------------------------
// Traditional servers = A chef who cooks one dish at a time. 
//   Customer A orders → Chef cooks for 20 min → Serves → Takes next order.
//
// Node.js server = A smart chef who puts dish A in the oven, then starts 
//   preparing dish B while A cooks. When the oven beeps (EVENT!), 
//   the chef serves dish A. One chef, many dishes, no idle time.
//
// ============================================================================

// --- YOUR VERY FIRST NODE.JS CODE ---

// console.log() works exactly like it does in the browser.
// But now it prints to your TERMINAL, not to a browser's developer console.

console.log("Hello, World! Welcome to Node.js! 🚀");

// --- Let's prove we are NOT in a browser ---

// In a browser, you have access to `window` and `document` objects.
// In Node.js, these do NOT exist. Instead, you have different global objects.

// This will print 'undefined' because `window` doesn't exist in Node.js
console.log("typeof window:", typeof window);   // undefined
console.log("typeof document:", typeof document); // undefined

// But Node.js gives us special globals that browsers DON'T have:

// `process` — Information about the current Node.js process
console.log("\n--- process object (Node.js exclusive) ---");
console.log("Node.js version:", process.version);        // e.g., v20.x.x
console.log("Platform:", process.platform);                // e.g., win32, linux, darwin
console.log("Architecture:", process.arch);                // e.g., x64, arm64
console.log("Process ID (PID):", process.pid);             // Unique ID for this running process
console.log("Current directory:", process.cwd());          // Where you ran this file from

// `__dirname` — The directory where THIS file lives
console.log("\n--- File location info ---");
console.log("This file is in directory:", __dirname);

// `__filename` — The full path of THIS file
console.log("This file's full path:", __filename);

// --- PRACTICAL EXAMPLE: Simple Calculator ---
// This shows that Node.js can do everything JS does, plus more.

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

const result1 = add(10, 5);
const result2 = subtract(10, 5);

console.log("\n--- Simple Calculator ---");
console.log(`10 + 5 = ${result1}`);  // 15
console.log(`10 - 5 = ${result2}`);  // 5

// ============================================================================
// ❌ COMMON MISTAKES:
// ============================================================================
// 1. Trying to use `document.getElementById()` in Node.js → ERROR! No DOM here.
// 2. Trying to use `alert()` → ERROR! That's a browser function.
// 3. Confusing Node.js with a framework — it's a RUNTIME, not a framework.
//    Express.js is a framework. Node.js is the engine that runs it.
//
// ============================================================================
// 🏃 HOW TO RUN THIS FILE:
// ============================================================================
// Open your terminal/command prompt and type:
//
//    node 01-hello-node.js
//
// That's it! Node.js reads this file and executes it line by line.
// ============================================================================

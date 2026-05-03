// ============================================================================
// 📘 LESSON 04: NPM MODULES — Core Modules (Built-in Modules)
// ============================================================================
//
// 🎯 THREE TYPES OF MODULES IN NODE.JS:
// --------------------------------------
// 1. CORE MODULES    → Built into Node.js (no installation needed)
// 2. LOCAL MODULES   → Files YOU create in your project
// 3. THIRD PARTY     → Installed from npm registry (npm install)
//
// This lesson focuses on CORE MODULES.
//
// 🎯 WHAT ARE CORE MODULES?
// --------------------------
// Core modules are pre-installed libraries that come WITH Node.js.
// You don't need to `npm install` them — they're always available.
// You just `require()` them by name.
//
// 🍳 ANALOGY:
// -----------
// Core modules are like the built-in apps on your phone (Calculator, Camera).
// You didn't download them — they came pre-installed.
// Third-party modules are like apps you download from the App Store.
//
// ============================================================================
// 📋 IMPORTANT CORE MODULES WE'LL USE IN THIS COURSE:
// ============================================================================
//
//   Module     │ Purpose
//   ───────────┼─────────────────────────────────────
//   fs         │ File System — read, write, delete files
//   path       │ Handle file/directory paths
//   os         │ Operating system info
//   http       │ Create web servers
//   events     │ EventEmitter for custom events
//   stream     │ Stream data in chunks
//   zlib       │ Compress/decompress data
//   crypto     │ Encryption and hashing
//   url        │ Parse URLs
//   util       │ Utility functions
//
// ============================================================================

// --- 1. THE `os` MODULE (Operating System Info) ---
const os = require("os");  // require() loads the module

console.log("=== OS Module ===\n");
console.log("OS Type:", os.type());            // e.g., "Windows_NT", "Linux", "Darwin"
console.log("OS Platform:", os.platform());    // e.g., "win32", "linux", "darwin"
console.log("OS Release:", os.release());      // e.g., "10.0.19045"
console.log("CPU Architecture:", os.arch());   // e.g., "x64"
console.log("Hostname:", os.hostname());       // Your computer's name
console.log("Home Directory:", os.homedir());  // e.g., "C:\\Users\\YourName"
console.log("Total Memory:", (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("Free Memory:", (os.freemem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("CPU Cores:", os.cpus().length);
console.log("Uptime:", (os.uptime() / 3600).toFixed(2), "hours");

// --- 2. THE `path` MODULE (File Path Utilities) ---
const path = require("path");

console.log("\n=== Path Module ===\n");

// path.basename() — Get just the filename from a full path
console.log("Basename:", path.basename("/users/documents/report.pdf")); 
// Output: report.pdf

// path.dirname() — Get the directory part of a path
console.log("Directory:", path.dirname("/users/documents/report.pdf")); 
// Output: /users/documents

// path.extname() — Get the file extension
console.log("Extension:", path.extname("photo.png")); 
// Output: .png

// path.join() — Safely join path segments (handles OS differences)
// On Windows: uses \   On Linux/Mac: uses /
const fullPath = path.join(__dirname, "data", "users", "file.txt");
console.log("Joined Path:", fullPath);

// path.resolve() — Resolves to an absolute path
console.log("Resolved:", path.resolve("src", "app.js"));

// path.parse() — Breaks a path into its components
const parsed = path.parse("/home/user/documents/report.pdf");
console.log("Parsed Path:", parsed);
// { root: '/', dir: '/home/user/documents', base: 'report.pdf', ext: '.pdf', name: 'report' }

// WHY use path.join() instead of string concatenation?
// ❌ BAD:  "/users" + "/" + "documents"   → Breaks on Windows!
// ✅ GOOD: path.join("/users", "documents") → Works everywhere!

// --- 3. THE `url` MODULE (URL Parsing) ---
const url = require("url");

console.log("\n=== URL Module ===\n");

const myUrl = new URL("https://example.com:8080/products?category=books&page=2#reviews");

console.log("Protocol:", myUrl.protocol);   // https:
console.log("Hostname:", myUrl.hostname);    // example.com
console.log("Port:", myUrl.port);            // 8080
console.log("Pathname:", myUrl.pathname);    // /products
console.log("Search:", myUrl.search);        // ?category=books&page=2
console.log("Hash:", myUrl.hash);            // #reviews

// Get individual query parameters
console.log("Category:", myUrl.searchParams.get("category")); // books
console.log("Page:", myUrl.searchParams.get("page"));         // 2

// --- 4. THE `crypto` MODULE (Hashing & Encryption) ---
const crypto = require("crypto");

console.log("\n=== Crypto Module ===\n");

// Create a hash of a password (NEVER store passwords as plain text!)
const password = "MySecretPassword123";
const hash = crypto.createHash("sha256").update(password).digest("hex");
console.log("Original Password:", password);
console.log("SHA-256 Hash:", hash);
// The hash is always the same length, regardless of input length
// Even changing ONE character produces a COMPLETELY different hash

// Generate a random token (useful for session IDs, API keys)
const token = crypto.randomBytes(32).toString("hex");
console.log("Random Token:", token);

// Generate a random UUID
const uuid = crypto.randomUUID();
console.log("UUID:", uuid);

// --- 5. THE `util` MODULE (Utility Functions) ---
const util = require("util");

console.log("\n=== Util Module ===\n");

// util.format() — Like printf in C
const formatted = util.format("Hello %s, you are %d years old", "Alice", 25);
console.log("Formatted:", formatted);

// util.inspect() — Convert objects to readable strings
const complexObj = { name: "Alice", hobbies: ["reading", { type: "sports", details: ["cricket", "tennis"] }] };
console.log("Inspected:", util.inspect(complexObj, { depth: null, colors: true }));

// ============================================================================
// ❌ COMMON MISTAKES:
// ============================================================================
// 1. Trying to `npm install os` — os is already built-in! Just `require("os")`.
//
// 2. Using string concatenation for paths instead of path.join().
//    → "folder" + "/" + "file.txt"  → BREAKS on Windows (uses \, not /)
//    → path.join("folder", "file.txt") → Works on ALL operating systems
//
// 3. Storing passwords as plain text instead of hashing them.
//    → Always use crypto.createHash() or better yet, bcrypt (third-party)
//
// 4. Confusing require() with import.
//    → require() is CommonJS (default in Node.js)
//    → import is ES Modules (needs "type": "module" in package.json or .mjs extension)
// ============================================================================
//
// 🏃 HOW TO RUN: node 04-core-modules.js
// ============================================================================

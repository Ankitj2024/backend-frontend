// ============================================================================
// 📘 LESSON 08: Working with the `fs` (File System) Module
// ============================================================================
//
// 🎯 The `fs` module lets Node.js interact with the file system:
//    Read, write, update, delete, rename files and directories.
//
// Two flavors: ASYNC (non-blocking) and SYNC (blocking)
//   fs.readFile()     → Async (preferred, uses callback)
//   fs.readFileSync() → Sync (blocks execution until done)
// ============================================================================

const fs = require("fs");
const path = require("path");

// We'll work with files in this directory
const dataDir = path.join(__dirname, "08-fs-data");

// Create the data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
    console.log("📁 Created directory:", dataDir);
}

// ============================================================================
// 1. WRITING FILES — fs.writeFile() & fs.writeFileSync()
// ============================================================================

// --- Synchronous (blocking) ---
const filePath1 = path.join(dataDir, "sync-file.txt");
fs.writeFileSync(filePath1, "Hello! This file was created synchronously.\nLine 2 here.");
console.log("✅ [Sync] File written:", filePath1);

// --- Asynchronous (non-blocking, preferred) ---
const filePath2 = path.join(dataDir, "async-file.txt");
fs.writeFile(filePath2, "Hello! This file was created asynchronously.\nLine 2 here.", (err) => {
    if (err) { console.log("❌ Error:", err.message); return; }
    console.log("✅ [Async] File written:", filePath2);
});

// ============================================================================
// 2. READING FILES — fs.readFile() & fs.readFileSync()
// ============================================================================

// --- Synchronous ---
const content1 = fs.readFileSync(filePath1, "utf8"); // "utf8" gives string, without it gives Buffer
console.log("\n📖 [Sync] Read file content:", content1);

// --- Asynchronous ---
fs.readFile(filePath1, "utf8", (err, data) => {
    if (err) { console.log("❌ Error:", err.message); return; }
    console.log("📖 [Async] Read file content:", data);
});

// ============================================================================
// 3. APPENDING TO FILES — fs.appendFile()
// ============================================================================

const logFile = path.join(dataDir, "log.txt");
fs.writeFileSync(logFile, "=== Application Log ===\n");

fs.appendFileSync(logFile, `[${new Date().toISOString()}] App started\n`);
fs.appendFileSync(logFile, `[${new Date().toISOString()}] User logged in\n`);
fs.appendFileSync(logFile, `[${new Date().toISOString()}] Data processed\n`);
console.log("\n📝 Log file created with 3 entries");

// ============================================================================
// 4. CHECKING IF FILE EXISTS — fs.existsSync()
// ============================================================================

console.log("\n🔍 Does sync-file.txt exist?", fs.existsSync(filePath1));    // true
console.log("🔍 Does ghost.txt exist?", fs.existsSync(path.join(dataDir, "ghost.txt"))); // false

// ============================================================================
// 5. FILE INFO — fs.stat()
// ============================================================================

const stats = fs.statSync(filePath1);
console.log("\n📊 File Stats for sync-file.txt:");
console.log("   Size:", stats.size, "bytes");
console.log("   Is File?", stats.isFile());
console.log("   Is Directory?", stats.isDirectory());
console.log("   Created:", stats.birthtime);
console.log("   Modified:", stats.mtime);

// ============================================================================
// 6. RENAMING FILES — fs.rename()
// ============================================================================

const oldName = path.join(dataDir, "async-file.txt");
const newName = path.join(dataDir, "renamed-file.txt");

// We use setTimeout to ensure the async write from Step 1 completes first
setTimeout(() => {
    if (fs.existsSync(oldName)) {
        fs.renameSync(oldName, newName);
        console.log("\n✏️ Renamed async-file.txt → renamed-file.txt");
    }
}, 500);

// ============================================================================
// 7. DELETING FILES — fs.unlink()
// ============================================================================

setTimeout(() => {
    if (fs.existsSync(newName)) {
        fs.unlinkSync(newName);
        console.log("🗑️ Deleted renamed-file.txt");
    }
}, 1000);

// ============================================================================
// 8. WORKING WITH DIRECTORIES
// ============================================================================

const testDir = path.join(dataDir, "test-folder");

// Create directory
if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
    console.log("\n📁 Created test-folder/");
}

// Create some files inside
fs.writeFileSync(path.join(testDir, "a.txt"), "File A");
fs.writeFileSync(path.join(testDir, "b.txt"), "File B");
fs.writeFileSync(path.join(testDir, "c.js"),  "// File C");

// Read directory contents — fs.readdirSync()
const files = fs.readdirSync(testDir);
console.log("📂 Contents of test-folder:", files); // ['a.txt', 'b.txt', 'c.js']

// Filter only .txt files
const txtFiles = files.filter(f => path.extname(f) === ".txt");
console.log("📄 Only .txt files:", txtFiles); // ['a.txt', 'b.txt']

// ============================================================================
// 9. COPYING FILES — fs.copyFile()
// ============================================================================

const src = path.join(dataDir, "sync-file.txt");
const dest = path.join(dataDir, "copy-of-sync.txt");
fs.copyFileSync(src, dest);
console.log("\n📋 Copied sync-file.txt → copy-of-sync.txt");

// ============================================================================
// ❌ COMMON MISTAKES:
// 1. Forgetting "utf8" encoding → you get a Buffer (raw bytes) not a string
// 2. Using Sync methods in production servers → blocks ALL other requests
// 3. Not checking if file exists before reading/deleting
// 4. Using fs.exists() (deprecated) → use fs.existsSync() instead
// ============================================================================
// 🏃 HOW TO RUN: node 08-fs-module.js

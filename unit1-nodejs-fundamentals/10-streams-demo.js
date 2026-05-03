// ============================================================================
// 📘 LESSON 10: Streams in Node.js
// ============================================================================
//
// 🎯 WHAT ARE STREAMS?
// --------------------
// Imagine watching a movie on YouTube. Do you wait for the ENTIRE 2GB file 
// to download before it starts playing? No! It "streams". 
// You watch small chunks as they arrive.
//
// In Node.js, Streams are objects that let you read data from a source or 
// write data to a destination in a continuous fashion, chunk by chunk.
//
// 🧠 WHY USE STREAMS?
// -------------------
// 1. MEMORY EFFICIENCY: You don't need to load large files (e.g., 4GB) into RAM.
// 2. TIME EFFICIENCY: You can start processing data as soon as the first 
//    chunk arrives, instead of waiting for the whole file.
//
// ============================================================================

const fs = require('fs');
const path = require('path');

console.log("=== Node.js Streams Demo ===\n");

const sourceFile = path.join(__dirname, 'large-input.txt');
const destFile = path.join(__dirname, 'output-copy.txt');

// --- SETUP: Create a "large" file for testing ---
fs.writeFileSync(sourceFile, "This is a test line repeated many times.\n".repeat(1000));

// ============================================================================
// 1. READABLE STREAMS
// ============================================================================
// Read data in chunks. Emits 'data' event for every chunk.

const readStream = fs.createReadStream(sourceFile, { 
    encoding: 'utf8',
    highWaterMark: 1024 // Chunk size in bytes (small for demo purposes)
});

console.log("Starting to read stream...");

readStream.on('data', (chunk) => {
    console.log('--- Received Chunk ---');
    console.log(chunk.substring(0, 50) + "..."); // Print start of chunk
});

readStream.on('end', () => {
    console.log('\n✅ Finished reading all chunks.');
});

// ============================================================================
// 2. WRITABLE STREAMS
// ============================================================================
// Write data chunk by chunk.

const writeStream = fs.createWriteStream(destFile);

writeStream.write('First line written via stream.\n');
writeStream.write('Second line written via stream.\n');
writeStream.end('Final line and closing stream.');

writeStream.on('finish', () => {
    console.log('✅ Writable stream finished writing.');
});

// ============================================================================
// 3. PIPING (The Magic ✨)
// ============================================================================
// .pipe() connects a readable stream to a writable stream automatically.
// It handles "backpressure" (making sure the reader doesn't overwhelm the writer).

const pipeSource = fs.createReadStream(sourceFile);
const pipeDest = fs.createWriteStream(path.join(__dirname, 'piped-output.txt'));

// This one line replaces dozens of lines of manual code!
pipeSource.pipe(pipeDest);

pipeDest.on('finish', () => {
    console.log('✅ File successfully Piped from source to destination.');
});

// ============================================================================
// ❌ COMMON MISTAKES:
// 1. Not handling errors: Streams can fail (e.g., file not found). 
//    Always add .on('error', ...)
// 2. Memory leaks: Forgetting to close or end a writable stream.
// ============================================================================
// 🏃 HOW TO RUN: node 10-streams-demo.js

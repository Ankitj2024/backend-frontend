/**
 * Node.js Core Modules Explanation & Demo
 * This file covers the essential modules studied in Unit 1.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const EventEmitter = require('events');
const stream = require('stream');
const zlib = require('zlib');

// ==========================================
// 1. OS MODULE (Operating System)
// Provides information about the computer's OS.
// ==========================================
console.log('--- OS MODULE ---');
console.log('Platform:', os.platform());      // e.g., win32, linux
console.log('Architecture:', os.arch());       // e.g., x64
console.log('Free Memory:', os.freemem());     // bytes
console.log('Total Memory:', os.totalmem());   // bytes
console.log('Home Dir:', os.homedir());        // Path to home directory
console.log('Uptime:', os.uptime(), 'seconds');
console.log('\n');

// ==========================================
// 2. PATH MODULE
// Utilities for handling and transforming file paths.
// ==========================================
console.log('--- PATH MODULE ---');
const samplePath = '/users/ankit/docs/resume.pdf';

console.log('Basename:', path.basename(samplePath)); // resume.pdf
console.log('Extension:', path.extname(samplePath));  // .pdf
console.log('Directory:', path.dirname(samplePath));  // /users/ankit/docs
console.log('Join Paths:', path.join('/home', 'user', 'project')); // /home/user/project
console.log('Resolve Absolute:', path.resolve('test.txt')); // Full absolute path
console.log('\n');

// ==========================================
// 3. FS MODULE (File System)
// Interact with the file system (Read/Write/Delete).
// ==========================================
console.log('--- FS MODULE (Async Examples) ---');

// Writing a file
fs.writeFile('demo.txt', 'Hello, this is core modules demo!', (err) => {
    if (err) throw err;
    console.log('1. File "demo.txt" created.');

    // Reading the file
    fs.readFile('demo.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log('2. File content:', data);

        // Appending to the file
        fs.appendFile('demo.txt', '\nAdded this line later.', (err) => {
            if (err) throw err;
            console.log('3. Content appended.');
            
            // Stats
            fs.stat('demo.txt', (err, stats) => {
                console.log(`4. File size: ${stats.size} bytes`);
            });
        });
    });
});

// ==========================================
// 4. EVENTS MODULE (EventEmitter)
// Backbone of Node.js event-driven architecture.
// ==========================================
const myEmitter = new EventEmitter();

// Registering a listener
myEmitter.on('userLogin', (username) => {
    console.log(`Event Received: User ${username} has logged in.`);
});

// Triggering the event
setTimeout(() => {
    console.log('\n--- EVENTS MODULE ---');
    myEmitter.emit('userLogin', 'Ankit');
}, 500);

// ==========================================
// 5. STREAM & ZLIB MODULES
// Processing data in chunks and compression.
// ==========================================
setTimeout(() => {
    console.log('\n--- STREAM & ZLIB ---');
    
    // Creating a readable stream from demo.txt
    const inp = fs.createReadStream('demo.txt');
    // Creating a writable stream to a compressed file
    const out = fs.createWriteStream('demo.txt.gz');
    // Compression transform stream
    const gzip = zlib.createGzip();

    // Piping: Read -> Compress -> Write
    inp.pipe(gzip).pipe(out);
    
    out.on('finish', () => {
        console.log('File successfully compressed using Streams and Zlib.');
    });
}, 1000);

// ==========================================
// 6. JSON (Global Object)
// Essential for data interchange.
// ==========================================
console.log('\n--- JSON ---');
const userObj = { name: "Ankit", role: "Developer" };
const jsonString = JSON.stringify(userObj);
console.log('Object to JSON:', jsonString);
console.log('JSON to Object:', JSON.parse(jsonString).name);

// ==========================================
// 7. HTTP MODULE
// Creating a basic web server.
// ==========================================
// Uncomment the lines below to run the server
/*
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello! This server is powered by the core http module.');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
*/

console.log('\n(Note: HTTP server code is commented out at the bottom of the file)');

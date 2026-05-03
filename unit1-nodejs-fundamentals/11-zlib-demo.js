// ============================================================================
// 📘 LESSON 11: Zlib (Compression and Decompression)
// ============================================================================
//
// 🎯 WHAT IS ZLIB?
// ----------------
// Zlib is a core Node.js module used for data compression. It uses algorithms 
// like GZIP and DEFLATE to make files smaller.
//
// 🍳 ANALOGY:
// -----------
// Sending a huge package via mail is expensive. If you VACUUM-PACK your 
// clothes (Compression), the box becomes smaller and cheaper to ship. 
// When the recipient opens the box, the air rushes back in (Decompression), 
// and the clothes return to their original size.
//
// In Web Dev, we use this to compress HTML/JS files before sending them 
// to the browser to make websites load faster!
// ============================================================================

const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

console.log("=== Zlib Compression Demo ===\n");

const inputFile = path.join(__dirname, 'text-to-zip.txt');
const gzipFile = path.join(__dirname, 'text-to-zip.txt.gz');
const decompressedFile = path.join(__dirname, 'restored-text.txt');

// --- SETUP: Create a file with repetitive text (highly compressible) ---
fs.writeFileSync(inputFile, "Node.js is awesome! ".repeat(5000));

// ============================================================================
// 1. COMPRESSING A FILE (GZIP)
// ============================================================================
// We use a Transform Stream: Read -> Compress -> Write

const compress = () => {
    const readable = fs.createReadStream(inputFile);
    const writable = fs.createWriteStream(gzipFile);
    const gzip = zlib.createGzip(); // This is the "Vacuum Packer" stream

    readable.pipe(gzip).pipe(writable);

    writable.on('finish', () => {
        const originalSize = fs.statSync(inputFile).size;
        const compressedSize = fs.statSync(gzipFile).size;
        
        console.log(`✅ Compression Complete!`);
        console.log(`   Original Size: ${(originalSize / 1024).toFixed(2)} KB`);
        console.log(`   Compressed Size: ${(compressedSize / 1024).toFixed(2)} KB`);
        console.log(`   Saved: ${(((originalSize - compressedSize) / originalSize) * 100).toFixed(2)}%\n`);
        
        decompress(); // Trigger next step
    });
};

// ============================================================================
// 2. DECOMPRESSING A FILE (GUNZIP)
// ============================================================================

const decompress = () => {
    const readable = fs.createReadStream(gzipFile);
    const writable = fs.createWriteStream(decompressedFile);
    const gunzip = zlib.createGunzip(); // This is the "Unpacker" stream

    readable.pipe(gunzip).pipe(writable);

    writable.on('finish', () => {
        console.log(`✅ Decompression Complete!`);
        console.log(`   File restored to: ${decompressedFile}`);
    });
};

// Start the process
compress();

// ============================================================================
// 🧠 PRO TIP:
// You can also compress strings directly in memory without files using:
// zlib.gzip(buffer, (err, compressed) => { ... });
// zlib.gunzip(compressed, (err, original) => { ... });
// ============================================================================
// 🏃 HOW TO RUN: node 11-zlib-demo.js

# Unit 1 — Part 3: Handling Data I/O in Node.js

---

## 9. Working with `fs` Module (File System)

### What is the `fs` module?
The `fs` (File System) module provides an API to **interact with the file system** — read, write, update, delete, and rename files and directories.

```javascript
const fs = require('fs');
```

### 9.1 Reading Files

**Asynchronous (Non-blocking) — Recommended**
```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('Error:', err.message);
        return;
    }
    console.log(data);
});
console.log('This runs first (non-blocking)');
```

**Synchronous (Blocking)**
```javascript
const fs = require('fs');

try {
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.log('Error:', err.message);
}
console.log('This runs after file is read');
```

### 9.2 Writing Files

**writeFile — Overwrites entire file (creates if doesn't exist)**
```javascript
fs.writeFile('output.txt', 'Hello Node.js!', (err) => {
    if (err) throw err;
    console.log('File written successfully');
});
```

**appendFile — Adds content to end of file**
```javascript
fs.appendFile('output.txt', '\nNew line added!', (err) => {
    if (err) throw err;
    console.log('Content appended');
});
```

### 9.3 Deleting Files
```javascript
fs.unlink('output.txt', (err) => {
    if (err) throw err;
    console.log('File deleted');
});
```

### 9.4 Renaming Files
```javascript
fs.rename('old.txt', 'new.txt', (err) => {
    if (err) throw err;
    console.log('File renamed');
});
```

### 9.5 Check if File Exists
```javascript
fs.access('example.txt', fs.constants.F_OK, (err) => {
    if (err) {
        console.log('File does not exist');
    } else {
        console.log('File exists');
    }
});

// Or synchronous:
console.log(fs.existsSync('example.txt'));  // true or false
```

### 9.6 Directory Operations
```javascript
// Create directory
fs.mkdir('myFolder', (err) => {
    if (err) throw err;
    console.log('Directory created');
});

// Read directory contents
fs.readdir('./', (err, files) => {
    if (err) throw err;
    console.log('Files:', files);  // ['app.js', 'example.txt', ...]
});

// Remove directory
fs.rmdir('myFolder', (err) => {
    if (err) throw err;
    console.log('Directory removed');
});
```

### 9.7 File Stats (Information)
```javascript
fs.stat('example.txt', (err, stats) => {
    if (err) throw err;
    console.log('Size:', stats.size, 'bytes');
    console.log('Is File:', stats.isFile());
    console.log('Is Directory:', stats.isDirectory());
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);
});
```

### fs Methods Summary Table
| Method | Description |
|---|---|
| `fs.readFile()` | Read file asynchronously |
| `fs.readFileSync()` | Read file synchronously |
| `fs.writeFile()` | Write/overwrite file |
| `fs.appendFile()` | Append to file |
| `fs.unlink()` | Delete a file |
| `fs.rename()` | Rename a file |
| `fs.mkdir()` | Create directory |
| `fs.readdir()` | List directory contents |
| `fs.rmdir()` | Remove directory |
| `fs.stat()` | Get file/directory information |
| `fs.existsSync()` | Check if file exists (sync) |
| `fs.copyFile()` | Copy a file |
| `fs.watchFile()` | Watch for file changes |

---

## 10. Working with JSON

### What is JSON?
JSON (JavaScript Object Notation) is a **lightweight data-interchange format**. It is easy to read/write for humans and easy to parse/generate for machines.

### JSON Syntax Rules
- Data is in **key-value pairs**
- Keys must be **strings in double quotes**
- Values can be: string, number, boolean, null, array, object
- No trailing commas, no comments

### Example JSON
```json
{
    "name": "Ankit Kumar",
    "age": 21,
    "isStudent": true,
    "skills": ["Node.js", "React", "MongoDB"],
    "address": {
        "city": "Delhi",
        "pin": "110001"
    }
}
```

### JSON Methods in JavaScript

**`JSON.stringify()` — Convert JS Object → JSON String**
```javascript
const student = {
    name: "Ankit",
    age: 21,
    skills: ["Node.js", "React"]
};

const jsonString = JSON.stringify(student);
console.log(jsonString);
// {"name":"Ankit","age":21,"skills":["Node.js","React"]}

// Pretty print with indentation
console.log(JSON.stringify(student, null, 2));
```

**`JSON.parse()` — Convert JSON String → JS Object**
```javascript
const jsonStr = '{"name":"Ankit","age":21}';

const obj = JSON.parse(jsonStr);
console.log(obj.name);  // Ankit
console.log(obj.age);   // 21
```

### Reading and Writing JSON Files
```javascript
const fs = require('fs');

// --- READING JSON FILE ---
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    console.log(jsonData.name);
});

// Synchronous version
const rawData = fs.readFileSync('data.json', 'utf8');
const jsonData = JSON.parse(rawData);
console.log(jsonData);

// --- WRITING JSON FILE ---
const user = { name: "Ankit", age: 21, city: "Delhi" };

fs.writeFile('user.json', JSON.stringify(user, null, 2), (err) => {
    if (err) throw err;
    console.log('JSON file saved!');
});
```

### Modifying JSON Data
```javascript
const fs = require('fs');

// Read → Modify → Write
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
data.age = 22;                      // Modify
data.skills.push('Express.js');     // Add to array

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('Data updated!');
```

---

## 11. Using Stream Module to Stream Data

### What are Streams?
Streams are objects that let you **read data from a source** or **write data to a destination** in a **continuous manner (chunk by chunk)** instead of loading the entire data into memory.

### Why Use Streams?
- **Memory Efficient** — processes data in chunks, not all at once
- **Time Efficient** — starts processing as soon as first chunk arrives
- **Great for large files** — videos, logs, big datasets

### Types of Streams
| Stream Type | Description | Example |
|---|---|---|
| **Readable** | Read data from source | `fs.createReadStream()` |
| **Writable** | Write data to destination | `fs.createWriteStream()` |
| **Duplex** | Both read and write | TCP sockets |
| **Transform** | Modify data while reading/writing | `zlib.createGzip()` |

### Readable Stream
```javascript
const fs = require('fs');

const readStream = fs.createReadStream('largefile.txt', 'utf8');

readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length, 'characters');
});

readStream.on('end', () => {
    console.log('Finished reading file');
});

readStream.on('error', (err) => {
    console.log('Error:', err.message);
});
```

### Writable Stream
```javascript
const fs = require('fs');

const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello ');
writeStream.write('World!\n');
writeStream.write('Streams are powerful.');
writeStream.end();  // Signal that writing is done

writeStream.on('finish', () => {
    console.log('Writing completed');
});
```

### Piping Streams (Connecting Read → Write)
Pipe connects a readable stream directly to a writable stream.
```javascript
const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

console.log('File copied using pipe!');
```

### Stream Events
| Event | Description |
|---|---|
| `data` | Fired when a chunk of data is available |
| `end` | Fired when there is no more data to read |
| `error` | Fired when an error occurs |
| `finish` | Fired when all data has been written (writable) |

### Piping with HTTP Server (Streaming a file as response)
```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const readStream = fs.createReadStream('largefile.txt');
    readStream.pipe(res);  // Stream file directly to response
});

server.listen(3000, () => console.log('Server on port 3000'));
```

---

## 12. Compressing and Decompressing Data with Zlib

### What is Zlib?
`zlib` is a **core module** in Node.js used for **compression and decompression** of data using algorithms like **Gzip** and **Deflate**.

### Why Use Compression?
- Reduces file size → faster data transfer
- Saves bandwidth
- Commonly used in web servers (gzip responses)

### Compressing a File (Gzip)
```javascript
const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('input.txt.gz');
const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream);

writeStream.on('finish', () => {
    console.log('File compressed successfully!');
});
```

### Decompressing a File (Gunzip)
```javascript
const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('input.txt.gz');
const writeStream = fs.createWriteStream('input_decompressed.txt');
const gunzip = zlib.createGunzip();

readStream.pipe(gunzip).pipe(writeStream);

writeStream.on('finish', () => {
    console.log('File decompressed successfully!');
});
```

### Compress/Decompress Strings (Buffers)
```javascript
const zlib = require('zlib');

const input = 'Hello, this is a string to compress!';

// Compress
zlib.gzip(input, (err, compressed) => {
    if (err) throw err;
    console.log('Compressed:', compressed);
    console.log('Compressed length:', compressed.length);

    // Decompress
    zlib.gunzip(compressed, (err, decompressed) => {
        if (err) throw err;
        console.log('Decompressed:', decompressed.toString());
    });
});
```

### Zlib with HTTP Server (Gzip Response)
```javascript
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'gzip'    // Tell browser it's gzipped
    });

    const readStream = fs.createReadStream('largefile.txt');
    const gzip = zlib.createGzip();

    readStream.pipe(gzip).pipe(res);  // Compress & send
});

server.listen(3000, () => console.log('Server on port 3000'));
```

### Zlib Methods Summary
| Method | Description |
|---|---|
| `zlib.createGzip()` | Create a Gzip compression stream |
| `zlib.createGunzip()` | Create a Gunzip decompression stream |
| `zlib.createDeflate()` | Create a Deflate compression stream |
| `zlib.createInflate()` | Create an Inflate decompression stream |
| `zlib.gzip(data, callback)` | Compress data (buffer/string) |
| `zlib.gunzip(data, callback)` | Decompress gzipped data |

---

## 13. Promises in Node.js

### What is a Promise?
A Promise is an object representing the **eventual completion or failure** of an asynchronous operation. It is a cleaner alternative to callbacks.

### Promise States
| State | Description |
|---|---|
| **Pending** | Initial state — neither fulfilled nor rejected |
| **Fulfilled** | Operation completed successfully (resolved) |
| **Rejected** | Operation failed (rejected) |

```
         ┌──── resolve(value) ────► Fulfilled (.then)
Pending ─┤
         └──── reject(error) ─────► Rejected (.catch)
```

### Creating a Promise
```javascript
const myPromise = new Promise((resolve, reject) => {
    let success = true;

    if (success) {
        resolve('Operation successful!');   // fulfilled
    } else {
        reject('Operation failed!');         // rejected
    }
});
```

### Consuming a Promise
```javascript
myPromise
    .then((result) => {
        console.log('Success:', result);
    })
    .catch((error) => {
        console.log('Error:', error);
    })
    .finally(() => {
        console.log('This runs regardless of result');
    });
```

### Real Example: Reading File with Promise
```javascript
const fs = require('fs');

function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

readFilePromise('example.txt')
    .then(data => console.log('Content:', data))
    .catch(err => console.log('Error:', err.message));
```

### Promise Chaining (Solving Callback Hell)
```javascript
readFilePromise('file1.txt')
    .then(data1 => {
        console.log('File 1:', data1);
        return readFilePromise('file2.txt');
    })
    .then(data2 => {
        console.log('File 2:', data2);
        return readFilePromise('file3.txt');
    })
    .then(data3 => {
        console.log('File 3:', data3);
    })
    .catch(err => {
        console.log('Error:', err.message);  // Catches ANY error in the chain
    });
```

### Promise.all() — Run Multiple Promises in Parallel
```javascript
const p1 = readFilePromise('file1.txt');
const p2 = readFilePromise('file2.txt');
const p3 = readFilePromise('file3.txt');

Promise.all([p1, p2, p3])
    .then(([data1, data2, data3]) => {
        console.log(data1, data2, data3);
    })
    .catch(err => console.log('One failed:', err.message));
// If ANY promise rejects, the entire Promise.all rejects
```

### Promise.race() — First to Complete Wins
```javascript
Promise.race([p1, p2, p3])
    .then(result => console.log('First resolved:', result))
    .catch(err => console.log('First rejected:', err.message));
```

### Promise.allSettled() — Wait for All (regardless of success/failure)
```javascript
Promise.allSettled([p1, p2, p3])
    .then(results => {
        results.forEach(r => {
            if (r.status === 'fulfilled') console.log('OK:', r.value);
            else console.log('FAIL:', r.reason);
        });
    });
```

---

## 14. async/await

### What is async/await?
`async/await` is **syntactic sugar** over Promises. It makes asynchronous code look and behave like synchronous code, making it easier to read and write.

### Rules
- `async` keyword is placed before a function → makes it return a Promise
- `await` keyword pauses execution until the Promise resolves
- `await` can **only** be used inside an `async` function

### Basic Syntax
```javascript
async function fetchData() {
    const result = await someAsyncOperation();
    console.log(result);
}
```

### Example: Reading File with async/await
```javascript
const fs = require('fs').promises;  // Use promise-based fs

async function readMyFile() {
    try {
        const data = await fs.readFile('example.txt', 'utf8');
        console.log('Content:', data);
    } catch (err) {
        console.log('Error:', err.message);
    }
}

readMyFile();
```

### Sequential Execution (One after another)
```javascript
const fs = require('fs').promises;

async function readAllFiles() {
    try {
        const data1 = await fs.readFile('file1.txt', 'utf8');
        console.log('File 1:', data1);

        const data2 = await fs.readFile('file2.txt', 'utf8');
        console.log('File 2:', data2);

        const data3 = await fs.readFile('file3.txt', 'utf8');
        console.log('File 3:', data3);
    } catch (err) {
        console.log('Error:', err.message);
    }
}

readAllFiles();
```

### Parallel Execution with async/await
```javascript
async function readAllParallel() {
    try {
        const [data1, data2, data3] = await Promise.all([
            fs.readFile('file1.txt', 'utf8'),
            fs.readFile('file2.txt', 'utf8'),
            fs.readFile('file3.txt', 'utf8')
        ]);
        console.log(data1, data2, data3);
    } catch (err) {
        console.log('Error:', err.message);
    }
}
```

### Error Handling: try/catch
```javascript
async function riskyOperation() {
    try {
        const result = await someAsyncTask();
        console.log(result);
    } catch (error) {
        console.log('Something went wrong:', error.message);
    } finally {
        console.log('Cleanup code runs regardless');
    }
}
```

### Real-World Example: API Call with async/await
```javascript
async function getUser() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await response.json();
        console.log('User:', user.name);
    } catch (err) {
        console.log('API Error:', err.message);
    }
}

getUser();
```

### Comparison: Callbacks vs Promises vs async/await

**Callbacks:**
```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) console.log(err);
    else console.log(data);
});
```

**Promises:**
```javascript
readFilePromise('file.txt')
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

**async/await:**
```javascript
async function read() {
    try {
        const data = await fs.promises.readFile('file.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
```

### Summary Table
| Feature | Callbacks | Promises | async/await |
|---|---|---|---|
| **Readability** | Poor (nested) | Better (chained) | Best (linear) |
| **Error Handling** | Manual in each callback | `.catch()` | `try/catch` |
| **Nesting** | Deep (callback hell) | Flat (chaining) | Flat (sequential) |
| **Introduced** | Original Node.js | ES6 (2015) | ES8 (2017) |
| **Debugging** | Difficult | Better | Easiest |

---

## ✅ Unit 1 Complete — Quick Revision Checklist

| Topic | Key Concept |
|---|---|
| **Node.js** | Runtime environment built on V8, event-driven, non-blocking I/O |
| **REPL** | Interactive shell — Read, Evaluate, Print, Loop |
| **npm** | Package manager — install, manage dependencies |
| **npm init** | Creates `package.json` — project metadata |
| **Core Modules** | Built-in — `fs`, `http`, `path`, `os`, `events`, `stream`, `zlib` |
| **Local Modules** | User-created — `module.exports` + `require('./file')` |
| **Third-Party Modules** | npm registry — `npm install` + `require('pkg')` |
| **EventEmitter** | `on()` to listen, `emit()` to trigger, `once()` for single fire |
| **Callbacks** | Function passed as argument, error-first pattern |
| **fs Module** | Read/write/delete/rename files and directories |
| **JSON** | `JSON.parse()` (string→object), `JSON.stringify()` (object→string) |
| **Streams** | Chunk-by-chunk data processing — Readable, Writable, Duplex, Transform |
| **Zlib** | Compression (`createGzip`) / Decompression (`createGunzip`) |
| **Promises** | `.then()`, `.catch()`, `.finally()`, `Promise.all()`, `Promise.race()` |
| **async/await** | `async` function + `await` keyword, `try/catch` for errors |

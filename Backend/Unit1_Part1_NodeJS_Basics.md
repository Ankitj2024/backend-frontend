

#### Using Core Modules
```javascript
// No installation needed — just require/import
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');

// Example: os module
console.log("Platform:", os.platform());      // win32 / linux / darwin
console.log("Architecture:", os.arch());       // x64
console.log("Free Memory:", os.freemem());     // bytes
console.log("Total Memory:", os.totalmem());   // bytes
console.log("Home Directory:", os.homedir());  // e.g., C:\Users\Ankit

// Example: path module
console.log(path.basename('/home/user/file.txt'));   // file.txt
console.log(path.extname('index.html'));             // .html
console.log(path.join('/home', 'user', 'docs'));     // /home/user/docs
console.log(path.resolve('file.txt'));               // Full absolute path

// Example: http module — creating a simple server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Node.js Server!');
});
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

### 6.2 Local Modules (User-defined Modules)
Modules created **by the developer** within the project.

#### Creating a Local Module
```javascript
// File: math.js (our custom module)
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

// Export functions to make them available
module.exports = { add, subtract, multiply };
```

#### Using the Local Module
```javascript
// File: app.js
const math = require('./math');   // Use relative path with ./

console.log(math.add(10, 5));        // 15
console.log(math.subtract(10, 5));   // 5
console.log(math.multiply(10, 5));   // 50
```

#### Different Ways to Export

**Method 1: module.exports as object**
```javascript
module.exports = { add, subtract, multiply };
```

**Method 2: Individual exports**
```javascript
module.exports.add = function(a, b) { return a + b; };
module.exports.subtract = function(a, b) { return a - b; };
```

**Method 3: exports shorthand**
```javascript
exports.add = function(a, b) { return a + b; };
exports.subtract = function(a, b) { return a - b; };
```

**Method 4: Export a single function/class**
```javascript
// greet.js
module.exports = function(name) {
    return `Hello, ${name}!`;
};

// app.js
const greet = require('./greet');
console.log(greet("Ankit"));   // Hello, Ankit!
```

### require() vs module.exports Flow
```
┌─────────────┐    require('./math')    ┌─────────────┐
│   app.js    │ ◄────────────────────── │   math.js   │
│             │                         │             │
│ Uses the    │    module.exports =     │ Defines &   │
│ functions   │    { add, subtract }    │ exports     │
└─────────────┘                         └─────────────┘
```

### 6.3 Third-Party Modules
Modules created by the **community** and available via **npm registry**.

#### Installing Third-Party Modules
```bash
npm install express        # Web framework
npm install lodash         # Utility library
npm install mongoose       # MongoDB ODM
npm install nodemon --save-dev  # Auto-restart server (dev tool)
```

#### Using Third-Party Modules
```javascript
// After: npm install lodash
const _ = require('lodash');

let arr = [1, 2, 3, 4, 5, 6];
console.log(_.chunk(arr, 2));      // [[1,2], [3,4], [5,6]]
console.log(_.reverse(arr));        // [6, 5, 4, 3, 2, 1]
console.log(_.random(1, 100));      // Random number between 1-100

// After: npm install express
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World with Express!');
});

app.listen(3000, () => console.log('Server on port 3000'));
```

### Comparison Table: All Three Module Types
| Feature | Core Modules | Local Modules | Third-Party Modules |
|---|---|---|---|
| **Source** | Built into Node.js | Created by developer | npm registry |
| **Installation** | Not needed | Not needed | `npm install` |
| **require syntax** | `require('fs')` | `require('./file')` | `require('express')` |
| **Location** | Node.js internals | Project directory | `node_modules/` |
| **Examples** | fs, http, path, os | math.js, utils.js | express, lodash |

---

> **Continue to Part 2 for: EventEmitter, Callbacks, fs module, JSON, Streams, Zlib, Promises & async/await**

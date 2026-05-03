// ============================================================================
// 📘 LESSON 09: Working with JSON in Node.js
// ============================================================================
//
// 🎯 WHAT IS JSON?
// -----------------
// JSON (JavaScript Object Notation) is the standard format for exchanging 
// data on the web. In Node.js, we use it constantly to:
//   1. Read configuration files (like package.json)
//   2. Send data to/from a database (like MongoDB)
//   3. Communicate with APIs
//
// Node.js has built-in support for JSON through the `JSON` global object.
// No 'require' is needed!
// ============================================================================

const fs = require('fs');
const path = require('path');

console.log("=== JSON Handling in Node.js ===\n");

// 1. DATA TO JSON STRING (JSON.stringify)
// ---------------------------------------
// Think of this as "Packing": Converting a JS Object into a string so it can 
// be saved to a file or sent over the network.

const user = {
    id: 1,
    name: "Ajit",
    email: "ajit@example.com",
    skills: ["Node.js", "Express", "React"],
    isActive: true
};

// Simple stringify
const jsonString = JSON.stringify(user);
console.log("Packed String:", jsonString);

// Pretty-print stringify (useful for saving readable files)
// Arguments: (object, replacer, spaceCount)
const prettyJsonString = JSON.stringify(user, null, 4);
console.log("\nPretty Packed String:\n", prettyJsonString);

// 2. JSON STRING TO DATA (JSON.parse)
// -----------------------------------
// Think of this as "Unpacking": Converting a string back into a JS Object 
// so we can access its properties.

const receivedString = '{"id":2,"name":"Sonia","role":"Developer"}';
const parsedUser = JSON.parse(receivedString);

console.log("\nUnpacked Name:", parsedUser.name); // Sonia
console.log("Unpacked Role:", parsedUser.role); // Developer

// 3. PRACTICAL: Saving and Reading JSON Files
// -------------------------------------------
const filePath = path.join(__dirname, 'user-data.json');

// WRITING JSON to a file
fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
console.log(`\n✅ Saved user data to: ${filePath}`);

// READING JSON from a file
const fileContent = fs.readFileSync(filePath, 'utf8');
const userDataFromFile = JSON.parse(fileContent);

console.log("Read from file - User Name:", userDataFromFile.name);

// ============================================================================
// ❌ COMMON MISTAKES:
// 1. Forgetting to parse: Trying to access `jsonString.name` will be undefined!
// 2. Invalid JSON: JSON requires DOUBLE QUOTES for keys and strings.
//    '{"name": "Ajit"}' is VALID.
//    "{'name': 'Ajit'}" is INVALID (JSON.parse will throw error).
// 3. Circular References: JSON.stringify fails if an object refers to itself.
// ============================================================================
// 🏃 HOW TO RUN: node 09-json-handling.js

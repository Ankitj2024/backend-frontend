// ============================================================================
// 📘 LESSON 03: NPM — Node Package Manager
// ============================================================================
//
// 🎯 WHAT IS NPM?
// ----------------
// NPM is the world's largest software registry (library). It comes bundled
// with Node.js automatically. It does THREE things:
//
//   1. PACKAGE MANAGER → Install, update, and remove third-party libraries
//   2. REGISTRY        → A massive online database of open-source packages
//   3. CLI TOOL        → Command-line tool to interact with packages
//
// 🍳 ANALOGY:
// -----------
// Think of NPM as an "App Store" for JavaScript developers.
// Need a date library? `npm install moment`
// Need a web framework? `npm install express`
// Need input validation? `npm install express-validator`
//
// Instead of writing everything from scratch, you INSTALL what others have built.
//
// ============================================================================
// 🔧 ESSENTIAL NPM COMMANDS:
// ============================================================================
//
// 1. Initialize a new project (creates package.json):
//    $ npm init                → Interactive mode (asks you questions)
//    $ npm init -y             → Quick mode (accepts all defaults)
//
// 2. Install a package:
//    $ npm install <package>   → Installs to node_modules/ and adds to package.json
//    $ npm install express     → Example: install Express.js
//    $ npm i express           → Short form (i = install)
//
// 3. Install as a dev dependency (only needed during development):
//    $ npm install --save-dev nodemon
//    $ npm i -D nodemon        → Short form
//
// 4. Install all dependencies from package.json:
//    $ npm install              → Reads package.json and installs everything
//
// 5. Uninstall a package:
//    $ npm uninstall <package>
//
// 6. List installed packages:
//    $ npm list                → Shows all installed packages
//    $ npm list --depth=0      → Shows only top-level packages
//
// 7. Check for outdated packages:
//    $ npm outdated
//
// 8. Run a script defined in package.json:
//    $ npm run <script-name>
//    $ npm start               → Special: doesn't need 'run' keyword
//
// ============================================================================
// 📦 UNDERSTANDING package.json
// ============================================================================
//
// package.json is the "identity card" of your Node.js project.
// It contains:
//   - name         → Project name (must be lowercase, no spaces)
//   - version      → Semantic versioning (MAJOR.MINOR.PATCH, e.g., 1.0.0)
//   - description  → What your project does
//   - main         → Entry point file (which file runs first)
//   - scripts      → Custom commands you can run with `npm run <name>`
//   - dependencies → Packages your project NEEDS to run
//   - devDependencies → Packages needed ONLY during development
//
// ============================================================================
// 🔢 SEMANTIC VERSIONING (SemVer)
// ============================================================================
//
//    Version: 2.4.1
//              │ │ │
//              │ │ └── PATCH: Bug fixes (backward compatible)
//              │ └──── MINOR: New features (backward compatible)
//              └────── MAJOR: Breaking changes (NOT backward compatible)
//
//    In package.json:
//      "express": "^4.18.2"
//                  ^  → Allows MINOR and PATCH updates (4.18.2, 4.19.0, etc.)
//
//      "express": "~4.18.2"
//                  ~  → Allows only PATCH updates (4.18.2, 4.18.3, etc.)
//
//      "express": "4.18.2"
//                     → Exact version only, no updates
//
// ============================================================================
// 📂 UNDERSTANDING node_modules
// ============================================================================
//
// When you run `npm install`, packages are downloaded into a folder
// called `node_modules/`. This folder can be HUGE (hundreds of MBs).
//
// ⚠️  GOLDEN RULE: NEVER commit node_modules to Git!
// Instead, add it to .gitignore. Anyone can recreate it by running `npm install`.
//
// ============================================================================
// 📄 UNDERSTANDING package-lock.json
// ============================================================================
//
// This file is AUTO-GENERATED. It locks the EXACT versions of every package
// (and their sub-dependencies) to ensure everyone on your team gets
// identical installs. NEVER edit this file manually.
//
// ============================================================================

// --- DEMO: Using an installed package ---
// If you run `npm install chalk@4` in this directory, you can use it:

console.log("=== NPM Demo ===\n");

// Let's demonstrate by reading our own package.json
const packageInfo = require("./package.json");

console.log("Project Name:", packageInfo.name);
console.log("Version:", packageInfo.version);
console.log("Description:", packageInfo.description);
console.log("Main File:", packageInfo.main);
console.log("Scripts:", JSON.stringify(packageInfo.scripts, null, 2));

console.log("\n--- How to run this file ---");
console.log("Option 1: node index.js");
console.log("Option 2: npm start (because 'start' script is defined in package.json)");

// ============================================================================
// ❌ COMMON MISTAKES:
// ============================================================================
// 1. Running `npm install` in the wrong directory.
//    → Always make sure you're in the folder that has package.json.
//
// 2. Committing node_modules/ to Git.
//    → Add `node_modules/` to your .gitignore file immediately!
//
// 3. Confusing `dependencies` vs `devDependencies`.
//    → dependencies: Needed in production (express, mongoose)
//    → devDependencies: Only for development (nodemon, jest)
//
// 4. Not understanding the ^ and ~ symbols in versions.
//    → ^1.2.3 allows 1.x.x updates (minor + patch)
//    → ~1.2.3 allows 1.2.x updates (patch only)
// ============================================================================

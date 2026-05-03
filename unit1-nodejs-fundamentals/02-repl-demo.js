// ============================================================================
// 📘 LESSON 02: NODE.JS REPL (Read-Evaluate-Print-Loop)
// ============================================================================
//
// 🎯 WHAT IS REPL?
// -----------------
// REPL stands for: Read → Evaluate → Print → Loop
//
// It's an interactive shell where you can type JavaScript commands one at a time
// and see results INSTANTLY. Think of it as a live JavaScript playground.
//
// 🍳 ANALOGY:
// -----------
// REPL is like a calculator. You type "2 + 2", press Enter, and it says "4".
// Then it waits for your next input. That's the "Loop" part — it keeps going.
//
// ============================================================================
// 🏃 HOW TO USE REPL:
// ============================================================================
//
// Step 1: Open your terminal/command prompt
// Step 2: Type: node
// Step 3: Press Enter
//
// You'll see a ">" prompt. Now you're INSIDE the REPL!
//
// TRY THESE COMMANDS ONE BY ONE IN THE REPL:
//
//   > 2 + 3
//   5
//
//   > "Hello" + " " + "World"
//   'Hello World'
//
//   > let x = 10
//   undefined          ← (variable declarations return undefined, that's normal)
//
//   > x * 5
//   50
//
//   > Math.random()
//   0.7234...           ← (some random number)
//
//   > console.log("Hi from REPL!")
//   Hi from REPL!
//   undefined           ← (console.log itself returns undefined)
//
// ============================================================================
// 🔧 SPECIAL REPL COMMANDS:
// ============================================================================
//
//   .help     → Shows all available REPL commands
//   .break    → Exits a multi-line expression (if you're stuck)
//   .clear    → Clears the REPL context (resets all variables)
//   .editor   → Enters multi-line editor mode (write multiple lines, then Ctrl+D to run)
//   .exit     → Exits the REPL (same as pressing Ctrl+C twice or Ctrl+D once)
//   .save     → Saves the current REPL session to a file (e.g., .save session.js)
//   .load     → Loads a file into the REPL (e.g., .load myfile.js)
//
// ============================================================================
// 🧪 REPL EXPERIMENT — The Underscore Variable (_)
// ============================================================================
//
// The REPL has a special variable: _ (underscore)
// It stores the result of the LAST evaluated expression.
//
// TRY THIS:
//   > 5 + 5
//   10
//   > _ + 20
//   30             ← _ was 10 (from the previous result), so 10 + 20 = 30
//   > _
//   30             ← Now _ is 30
//
// ============================================================================
// 📝 THIS FILE IS A REFERENCE — YOU DON'T "RUN" IT
// ============================================================================
// This file is meant to be READ as a guide. The actual learning happens
// when you open your terminal, type `node`, and experiment in the REPL.
//
// However, here's a script that SIMULATES what you'd do in the REPL:

console.log("=== Simulating REPL Operations ===\n");

// In REPL, you'd type: 2 + 3
let result1 = 2 + 3;
console.log("> 2 + 3");
console.log(result1);  // 5

// In REPL, you'd type: "Hello" + " World"
let result2 = "Hello" + " World";
console.log('\n> "Hello" + " World"');
console.log(result2);  // Hello World

// In REPL, you'd type: Math.max(10, 20, 5, 30)
let result3 = Math.max(10, 20, 5, 30);
console.log("\n> Math.max(10, 20, 5, 30)");
console.log(result3);  // 30

// In REPL, you'd type: [1, 2, 3].map(x => x * 2)
let result4 = [1, 2, 3].map(x => x * 2);
console.log("\n> [1, 2, 3].map(x => x * 2)");
console.log(result4);  // [2, 4, 6]

// In REPL, you'd type: typeof null
let result5 = typeof null;
console.log("\n> typeof null");
console.log(result5);  // "object" — This is a famous JavaScript bug!

console.log("\n=== Now go try it yourself! Type 'node' in your terminal ===");

// ============================================================================
// ❌ COMMON MISTAKES:
// ============================================================================
// 1. Typing `node 02-repl-demo.js` when you want the REPL.
//    → For REPL, just type `node` with NO filename.
//    → `node filename.js` RUNS the file (that's different!).
//
// 2. Getting stuck in multi-line mode (you typed an incomplete expression).
//    → Press Ctrl+C or type .break to escape.
//
// 3. Forgetting that REPL state is temporary.
//    → Once you exit REPL, ALL your variables and functions are gone.
//    → Use .save to keep your work.
// ============================================================================

// ============================================================================
// 📘 LESSON 12: Promises and Async/Await
// ============================================================================
//
// 🎯 THE PROBLEM: CALLBACK HELL
// -----------------------------
// In Lesson 07, we saw how nesting callbacks makes code unreadable (Pyramid 
// of Doom). Promises and Async/Await were invented to solve this.
//
// 🎯 WHAT IS A PROMISE?
// ---------------------
// A Promise is a placeholder for a value that will be available LATER.
// It has 3 states:
//   1. PENDING: Still working...
//   2. RESOLVED (Fulfilled): Success! Here is your data.
//   3. REJECTED: Failed! Here is the error.
//
// 🍳 ANALOGY: Ordering food at a buzzer restaurant
// -----------------------------------------------
// 1. You order food. They give you a BUZZER (The Promise).
// 2. The buzzer is currently PENDING (The kitchen is cooking).
// 3. When food is ready, the buzzer flashes (RESOLVED). You get your meal.
// 4. If they run out of ingredients, the manager tells you (REJECTED).
// ============================================================================

console.log("=== Promises & Async/Await Demo ===\n");

// --- 1. Creating a Manual Promise ---
const orderPizza = (isAvailable) => {
    return new Promise((resolve, reject) => {
        console.log("🍕 Order placed, cooking...");
        
        setTimeout(() => {
            if (isAvailable) {
                resolve("Hot Pizza is here!"); // SUCCESS
            } else {
                reject("Sorry, we are out of dough."); // FAILURE
            }
        }, 1500);
    });
};

// --- 2. Consuming a Promise (.then / .catch) ---
// This was the standard way before async/await.
/*
orderPizza(true)
    .then((message) => {
        console.log("Result 1:", message);
    })
    .catch((error) => {
        console.log("Error 1:", error);
    });
*/

// --- 3. ASYNC / AWAIT (The Modern Way) ---
// This makes asynchronous code LOOK like synchronous code. 
// It's much easier to read!

const handleOrder = async () => {
    try {
        console.log("--- Starting Async Order ---");
        
        // 'await' tells Node: "Pause here until the promise resolves"
        const result = await orderPizza(true); 
        console.log("Async Result:", result);
        
        console.log("--- Ordering Side Dish ---");
        const sideResult = await orderPizza(false); // This will fail
        console.log("Side Result:", sideResult);

    } catch (error) {
        // All errors in the 'try' block are caught here!
        console.log("❌ Caught in Async/Await:", error);
    } finally {
        console.log("🏁 Process finished (Success or Failure).");
    }
};

handleOrder();

// ============================================================================
// 🧠 WHY THIS IS BETTER:
// Without Async/Await, if you wanted to order 5 things one after another, 
// you would have 5 levels of .then() nesting. 
// With Async/Await, you just have 5 lines of code!
//
// ⚠️ RULES:
// 1. You can ONLY use 'await' inside an 'async' function.
// 2. Always wrap 'await' in a 'try/catch' block to handle errors.
// ============================================================================
// 🏃 HOW TO RUN: node 12-promises-async-await.js

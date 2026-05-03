// ============================================================================
// 📘 LESSON 06: EventEmitter in Node.js
// ============================================================================
//
// 🎯 WHAT IS AN EVENT?
// ---------------------
// An event is a signal that something has happened.
// Examples:
//   - A user clicked a button → "click" event
//   - A file finished downloading → "complete" event
//   - A new user registered → "newUser" event
//   - An error occurred → "error" event
//
// 🎯 WHAT IS EventEmitter?
// -------------------------
// EventEmitter is a class in Node.js's `events` core module.
// It lets you CREATE your own custom events and RESPOND to them.
//
// Two main operations:
//   1. EMIT an event   → "Hey, something happened!" (the announcement)
//   2. LISTEN for an event → "When that happens, do THIS" (the response)
//
// 🍳 ANALOGY: The School Bell System
// ------------------------------------
// The school bell is an EventEmitter:
//   - When the bell RINGS (emit), all students RESPOND (listeners):
//     → "bell_ring" event: Students go to class
//     → "lunch_bell" event: Students go to cafeteria
//     → "fire_alarm" event: Students evacuate
//
// The bell doesn't care WHO is listening. It just rings.
// Multiple listeners can respond to the SAME event.
//
// ============================================================================

// Step 1: Import the EventEmitter class from the 'events' core module
const EventEmitter = require("events");

// Step 2: Create an instance of EventEmitter
const emitter = new EventEmitter();

console.log("=== EventEmitter Basics ===\n");

// ============================================================================
// PART 1: Basic .on() and .emit()
// ============================================================================

// .on(eventName, callback) → Register a LISTENER for an event
// This says: "When 'greet' event is emitted, run this function"
emitter.on("greet", () => {
    console.log("🎉 Hello! Someone triggered the 'greet' event!");
});

// You can have MULTIPLE listeners for the SAME event
emitter.on("greet", () => {
    console.log("👋 Another listener also responded to 'greet'!");
});

// .emit(eventName) → FIRE the event (trigger all listeners)
console.log("About to emit 'greet' event...");
emitter.emit("greet");
// Both listeners above will run, in the ORDER they were registered.

// ============================================================================
// PART 2: Passing Data with Events
// ============================================================================

console.log("\n=== Passing Data with Events ===\n");

// You can pass data (arguments) when emitting an event
emitter.on("userRegistered", (user) => {
    console.log(`📧 Send welcome email to: ${user.email}`);
});

emitter.on("userRegistered", (user) => {
    console.log(`📝 Log: New user '${user.name}' registered at ${new Date().toLocaleTimeString()}`);
});

// Emit with data — the object is passed to ALL listeners
emitter.emit("userRegistered", { name: "Alice", email: "alice@example.com" });

// ============================================================================
// PART 3: .once() — Listen ONLY ONCE
// ============================================================================

console.log("\n=== .once() — One-time Listener ===\n");

// .once() registers a listener that runs ONLY the first time the event is emitted
emitter.once("connect", () => {
    console.log("🔌 Connected! (This will only print ONCE)");
});

emitter.emit("connect");  // ✅ Prints the message
emitter.emit("connect");  // ❌ Nothing happens (listener was removed after first call)
emitter.emit("connect");  // ❌ Nothing happens
console.log("(Notice 'connect' was emitted 3 times, but listener ran only once)");

// ============================================================================
// PART 4: Removing Listeners
// ============================================================================

console.log("\n=== Removing Listeners ===\n");

// To remove a listener, you need a NAMED function (not anonymous)
function onDataReceived(data) {
    console.log("📥 Data received:", data);
}

emitter.on("data", onDataReceived);
emitter.emit("data", "First batch");    // ✅ Listener runs

// .removeListener() or .off() — removes a specific listener
emitter.off("data", onDataReceived);    // .off() is an alias for .removeListener()
emitter.emit("data", "Second batch");   // ❌ Nothing happens, listener was removed
console.log("(Second emission produced no output — listener was removed)");

// .removeAllListeners() — removes ALL listeners for an event
// emitter.removeAllListeners("data");   // Removes all "data" listeners
// emitter.removeAllListeners();         // Removes ALL listeners for ALL events (nuclear option!)

// ============================================================================
// PART 5: Useful EventEmitter Methods
// ============================================================================

console.log("\n=== Useful Methods ===\n");

// Re-register some listeners for demonstration
emitter.on("test", () => {});
emitter.on("test", () => {});
emitter.on("test", () => {});

// .listenerCount(eventName) — How many listeners are registered?
console.log("Listener count for 'test':", emitter.listenerCount("test")); // 3

// .eventNames() — What events have listeners?
console.log("Events with listeners:", emitter.eventNames());

// .getMaxListeners() — Default max is 10 (warning if exceeded)
console.log("Max listeners:", emitter.getMaxListeners()); // 10

// .setMaxListeners(n) — Change the limit
emitter.setMaxListeners(20);  // Increase if you need more than 10

// ============================================================================
// PART 6: REAL-WORLD EXAMPLE — Order Processing System
// ============================================================================

console.log("\n=== Real-World Example: Order Processing ===\n");

class OrderSystem extends EventEmitter {
    placeOrder(order) {
        console.log(`\n🛒 Order #${order.id} placed: ${order.item} (₹${order.price})`);
        
        // Emit different events at different stages
        this.emit("orderPlaced", order);

        // Simulate processing
        setTimeout(() => {
            this.emit("orderProcessed", order);
        }, 1000);

        // Simulate shipping
        setTimeout(() => {
            this.emit("orderShipped", order);
        }, 2000);

        // Simulate delivery
        setTimeout(() => {
            this.emit("orderDelivered", order);
        }, 3000);
    }
}

const shop = new OrderSystem();

// Register listeners for each event
shop.on("orderPlaced", (order) => {
    console.log(`  ✅ Payment of ₹${order.price} confirmed for order #${order.id}`);
});

shop.on("orderProcessed", (order) => {
    console.log(`  📦 Order #${order.id} has been packed and is ready to ship`);
});

shop.on("orderShipped", (order) => {
    console.log(`  🚚 Order #${order.id} is on its way!`);
});

shop.on("orderDelivered", (order) => {
    console.log(`  🎉 Order #${order.id} (${order.item}) has been delivered!`);
});

// Place an order — this will trigger the entire chain
shop.placeOrder({ id: 1001, item: "Node.js Guidebook", price: 499 });

// ============================================================================
// 🧠 WHY IS EventEmitter IMPORTANT?
// ============================================================================
// Almost EVERYTHING in Node.js is built on EventEmitter:
//   - HTTP Server → emits "request" events
//   - File Streams → emit "data", "end", "error" events
//   - Process → emits "exit", "uncaughtException" events
//
// When you write `server.on("request", callback)` in Express/HTTP,
// you're using EventEmitter under the hood!
// ============================================================================
//
// ❌ COMMON MISTAKES:
// 1. Forgetting that .emit() is SYNCHRONOUS — all listeners run immediately
//    before the next line executes (except when using setTimeout like above).
// 2. Memory leaks: Adding listeners in a loop without removing them.
//    → Node will warn: "MaxListenersExceededWarning"
// 3. Not handling the 'error' event — if you emit 'error' and no listener
//    is registered, Node.js will CRASH with an unhandled error.
// ============================================================================
//
// 🏃 HOW TO RUN: node 06-event-emitter.js
// ============================================================================

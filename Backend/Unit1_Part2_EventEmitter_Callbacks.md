# Unit 1 — Part 2: EventEmitter & Callbacks in Node.js

---

## 7. EventEmitter in Node.js

### What is EventEmitter?
EventEmitter is a class in the `events` core module that allows objects to **emit named events** and **register listener functions** for those events. It is the backbone of Node.js's event-driven architecture.

### How it Works
```
  emit('event')          ┌──────────────┐
  ─────────────────────► │  Listener 1  │
                         ├──────────────┤
  EventEmitter object    │  Listener 2  │
                         ├──────────────┤
                         │  Listener 3  │
                         └──────────────┘
```

### Basic Syntax
```javascript
const EventEmitter = require('events');

// Step 1: Create an instance
const emitter = new EventEmitter();

// Step 2: Register a listener (subscriber)
emitter.on('greet', () => {
    console.log('Hello! Someone greeted.');
});

// Step 3: Emit (trigger) the event
emitter.emit('greet');
// Output: Hello! Someone greeted.
```

### Passing Arguments with Events
```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('orderPlaced', (orderId, amount) => {
    console.log(`Order ${orderId} placed for Rs.${amount}`);
});

emitter.emit('orderPlaced', 101, 500);
// Output: Order 101 placed for Rs.500
```

### Multiple Listeners for Same Event
```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('start', () => {
    console.log('Listener 1: Server starting...');
});

emitter.on('start', () => {
    console.log('Listener 2: Logging enabled...');
});

emitter.emit('start');
// Output:
// Listener 1: Server starting...
// Listener 2: Logging enabled...
```

### Key EventEmitter Methods

| Method | Description |
|---|---|
| `emitter.on(event, listener)` | Register a listener for an event |
| `emitter.emit(event, [args])` | Trigger/fire an event |
| `emitter.once(event, listener)` | Listener fires only **once**, then removed |
| `emitter.off(event, listener)` | Remove a specific listener (alias: `removeListener`) |
| `emitter.removeAllListeners(event)` | Remove all listeners for an event |
| `emitter.listenerCount(event)` | Returns number of listeners for an event |
| `emitter.eventNames()` | Returns array of event names with registered listeners |

### `once()` — Fire Only Once
```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.once('connect', () => {
    console.log('Connected! (This runs only once)');
});

emitter.emit('connect');  // Connected! (This runs only once)
emitter.emit('connect');  // Nothing happens — listener was removed
```

### Removing Listeners
```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

function onData(data) {
    console.log('Data received:', data);
}

emitter.on('data', onData);
emitter.emit('data', 'Hello');    // Data received: Hello

emitter.off('data', onData);      // Remove the listener
emitter.emit('data', 'World');    // Nothing happens
```

### Extending EventEmitter (Creating Custom Classes)
```javascript
const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit('messageLogged', { id: 1, message: message });
    }
}

const logger = new Logger();

logger.on('messageLogged', (data) => {
    console.log('Listener called:', data);
});

logger.log('Hello World');
// Output:
// Hello World
// Listener called: { id: 1, message: 'Hello World' }
```

### Real-World Example: Order System
```javascript
const EventEmitter = require('events');

class OrderSystem extends EventEmitter {
    placeOrder(item, qty) {
        console.log(`Order placed: ${qty}x ${item}`);
        this.emit('ordered', { item, qty });
    }
}

const shop = new OrderSystem();

// Listener 1: Send confirmation email
shop.on('ordered', (order) => {
    console.log(`Email sent for ${order.qty}x ${order.item}`);
});

// Listener 2: Update inventory
shop.on('ordered', (order) => {
    console.log(`Inventory updated: -${order.qty} ${order.item}`);
});

shop.placeOrder('Laptop', 2);
// Output:
// Order placed: 2x Laptop
// Email sent for 2x Laptop
// Inventory updated: -2 Laptop
```

---

## 8. Callbacks in Node.js

### What is a Callback?
A callback is a **function passed as an argument to another function**, which is then **invoked (called back)** after the completion of an operation. Callbacks are the foundation of asynchronous programming in Node.js.

### Synchronous Callback
```javascript
function greet(name, callback) {
    console.log('Hello ' + name);
    callback();
}

function sayBye() {
    console.log('Goodbye!');
}

greet('Ankit', sayBye);
// Output:
// Hello Ankit
// Goodbye!
```

### Asynchronous Callback
```javascript
console.log('Start');

setTimeout(() => {
    console.log('Inside setTimeout (after 2 seconds)');
}, 2000);

console.log('End');

// Output:
// Start
// End
// Inside setTimeout (after 2 seconds)   ← runs after 2s
```

### Callback with File Reading (Async)
```javascript
const fs = require('fs');

console.log('Before reading file');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('Error:', err.message);
        return;
    }
    console.log('File content:', data);
});

console.log('After reading file (this prints first!)');

// Output:
// Before reading file
// After reading file (this prints first!)
// File content: <contents of example.txt>
```

### Error-First Callback Pattern
Node.js follows the **error-first callback convention**: the first argument of the callback is always an error object (or `null` if no error).

```javascript
function divide(a, b, callback) {
    if (b === 0) {
        callback(new Error('Cannot divide by zero'), null);
    } else {
        callback(null, a / b);
    }
}

divide(10, 2, (err, result) => {
    if (err) {
        console.log('Error:', err.message);
    } else {
        console.log('Result:', result);   // Result: 5
    }
});

divide(10, 0, (err, result) => {
    if (err) {
        console.log('Error:', err.message);  // Error: Cannot divide by zero
    } else {
        console.log('Result:', result);
    }
});
```

### Callback Hell (Pyramid of Doom)
When multiple asynchronous operations depend on each other, callbacks get deeply nested — this is called **Callback Hell**.

```javascript
const fs = require('fs');

fs.readFile('file1.txt', 'utf8', (err, data1) => {
    if (err) throw err;
    fs.readFile('file2.txt', 'utf8', (err, data2) => {
        if (err) throw err;
        fs.readFile('file3.txt', 'utf8', (err, data3) => {
            if (err) throw err;
            console.log(data1, data2, data3);
            // More nesting...
        });
    });
});
```

**Problems with Callback Hell:**
- Hard to read and maintain
- Difficult error handling
- Hard to debug

**Solutions:**
1. **Named functions** (break into separate functions)
2. **Promises** (`.then()` chaining)
3. **async/await** (modern approach — covered in Part 3)

### Callback vs Synchronous Execution
| Aspect | Synchronous | Asynchronous (Callback) |
|---|---|---|
| **Execution** | Line by line, blocking | Non-blocking, continues execution |
| **Performance** | Slower for I/O operations | Faster, handles concurrent tasks |
| **Example** | `fs.readFileSync()` | `fs.readFile()` |
| **Use case** | Simple scripts | Servers, APIs, real-time apps |

---

> **Continue to Part 3 for: fs module, JSON, Streams, Zlib, Promises & async/await**

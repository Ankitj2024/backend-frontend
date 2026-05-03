// ============================================================================
// 📘 LESSON 03: Introduction to WebSockets
// ============================================================================
//
// 🎯 WHY WEBSOCKETS?
// ------------------
// Standard HTTP is like a Walkie-Talkie: Only one person speaks at a time, 
// and the connection closes after each message.
//
// WebSockets are like a Telephone Call: Once the connection is open, 
// both sides can talk at the same time, and it stays open forever!
//
// 🧠 KEY USES:
// - Chat apps (WhatsApp Web)
// - Live Stock/Crypto prices
// - Multiplayer Games
// - Collaborative tools (Google Docs)
// ============================================================================

const http = require('http');
const WebSocket = require('ws'); // You must install 'ws' package

// 1. Create a regular HTTP server first
const server = http.createServer((req, res) => {
    res.end('<h1>WebSocket Server is Running!</h1>');
});

// 2. Wrap the HTTP server with a WebSocket server
const wss = new WebSocket.Server({ server });

console.log("=== Basic WebSocket Server ===\n");

// 3. LISTEN FOR CONNECTIONS
wss.on('connection', (ws) => {
    console.log('🤝 New Client Connected!');

    // Send a message to the new client
    ws.send('Welcome to the WebSocket Server! 🚀');

    // 4. LISTEN FOR MESSAGES FROM CLIENT
    ws.on('message', (message) => {
        console.log(`📩 Received: ${message}`);
        
        // ECHO the message back
        ws.send(`Server says: I received your message "${message}"`);
    });

    // 5. HANDLE DISCONNECT
    ws.on('close', () => {
        console.log('👋 Client disconnected.');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

// ============================================================================
// ⚠️ PREREQUISITE: npm install ws
// ============================================================================
// 🧪 HOW TO TEST (Without a Frontend):
// 1. Run the server: node 03-websocket-intro.js
// 2. Go to: https://websocketking.com/
// 3. Enter: ws://localhost:3000
// 4. Click Connect and send a message!
// ============================================================================

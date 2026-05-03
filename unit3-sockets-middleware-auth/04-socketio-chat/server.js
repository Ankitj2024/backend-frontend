// ============================================================================
// 📘 LESSON 04B: Socket.IO Chat Server
// ============================================================================
//
// 🎯 WHAT IS SOCKET.IO?
// ---------------------
// Socket.io is a library that builds ON TOP of WebSockets. 
// It is better because:
// 1. Reliability: If WebSockets fail, it falls back to HTTP Polling.
// 2. Events: You can create custom events (like 'typing', 'chat message').
// 3. Rooms: You can group users into specific chat rooms.
// ============================================================================

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Attach Socket.io to the server

// Serve the static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- SOCKET.IO LOGIC ---
io.on('connection', (socket) => {
    console.log(`✨ A user connected (ID: ${socket.id})`);

    // Listen for 'chat message' event from a client
    socket.on('chat message', (msg) => {
        console.log(`💬 Message: ${msg}`);
        
        // EMIT (Broadcast) the message to EVERYONE connected
        io.emit('chat message', {
            user: socket.id.substring(0, 5), // Use part of ID as nickname
            text: msg
        });
    });

    socket.on('disconnect', () => {
        console.log('👤 A user disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Chat app running at http://localhost:${PORT}`);
});

// ============================================================================
// ⚠️ PREREQUISITE: npm install socket.io
// ============================================================================
// 🏃 HOW TO TEST:
// 1. Open http://localhost:3000 in TWO different browser tabs.
// 2. Type messages in one tab, and watch them appear in the other!
// ============================================================================

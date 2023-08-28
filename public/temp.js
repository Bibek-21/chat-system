
// *Server-Side (Node.js) Implementation:*
// javascript
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const secretKey = 'your-secret-key'; // Replace with your actual secret key

// Middleware to authenticate Socket.IO connections
io.use((socket, next) => {
  const token = socket.handshake.query.token;

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error'));
      }
      socket.user = decoded.user; // Attach user information to the socket
      next();
    });
  } else {
    next(new Error('Authentication token missing'));
  }
});

io.on('connection', (socket) => {
  console.log(`User ${socket.user} connected`);

  // Listen for incoming messages
  socket.on('message', (data) => {
    console.log(`Received message from ${socket.user}: ${data}`);
    // Broadcast the message to all connected clients
    io.emit('message', { user: socket.user, message: data });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User ${socket.user} disconnected`);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});


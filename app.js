const express = require('express');
const { createServer } = require('node:http');

const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);
server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });
  
  io.on('connection', (socket) => {
    // Handle one-to-one chat messages
    socket.on('private message', (data) => {
        console.log('a user connected');
      const { sender, receiver, message } = data;
      console.log(data);
      io.to(receiver).emit('private message', { sender, message });
    });
})
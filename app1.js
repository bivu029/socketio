const express = require('express');
const socketIO = require('socket.io');

const app = express();

async function startServer() {
  try {
    //create a server
    const server = app.listen(3000, () => {
        console.log('Server running at http://localhost:3000');
      });
      
      //attached  socket.io with server
    const io = socketIO(server);

    //create socket connection
    io.on('connection', async (socket) => {
      console.log('a user connected');

    //create message connection
      socket.on('private message', async (data) => {
        try {
          const { sender, receiver, message } = data;
          console.log(data);
          io.emit('private message', { sender, message });
        } catch (err) {
          console.error('Error emitting private message:', err);
          // Handle errors during message emission
        }
      });
      //show if user disconnected
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

     // Handle Socket.IO errors
    io.on('error', (err) => {
      console.error('Socket.IO error:', err);
     
    });
  } catch (err) {
     // Handle server startup errors
    console.error('Server error:', err);
   
  }
}

startServer();



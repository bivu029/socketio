const express = require('express');
const socketIO = require('socket.io');

const app = express();

var users=0;
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
      //we user connected add user
      users++;
      //if we want to send every one connected to this socket server as broadcast message
      io.sockets.emit('broadcast',`${users} connected`);

     
      

  
      //show if user disconnected
      socket.on('disconnect', () => {
        console.log('user disconnected');
        //when user disconnect 
        users--;
        //emit this as brodcast to all user
        io.sockets.emit('broadcast',`${users} disconnected`);
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


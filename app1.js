const express = require("express");
const socketIO = require("socket.io");

const app = express();

var users = 0;
async function startServer() {
  try {
    //create a server
    const server = app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });

    //attached  socket.io with server
    const io = socketIO(server);

    //create socket connection
    io.on("connection", async (socket) => {
      console.log("a user connected");
      //we user connected add user
      users++;

      //now if we want to show a welcome or custom msg to newly added user ,not existing user
      //we need create custom emit event
      socket.emit("new user connected", { message: "hi , welcome" });
      //now if want to only show msg to existing users in socket that a new user connected
      socket.broadcast.emit("new user connected", {
        message: users + "user connected",
      }),
        //show if user disconnected
        socket.on("disconnect", () => {
          console.log("user disconnected");
          //when user disconnect
          users--;
          //now if want to only show msg to existing users in socket that a new user connected
          socket.broadcast.emit("new user connected", {
            message: users + "user disconnected",
          });
        });
    });

    // Handle Socket.IO errors
    io.on("error", (err) => {
      console.error("Socket.IO error:", err);
    });
  } catch (err) {
    // Handle server startup errors
    console.error("Server error:", err);
  }
}

startServer();

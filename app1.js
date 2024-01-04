const express = require("express");

const socketservice = require("./socket/socket_service/socket_service");

const app = express();

async function startServer() {
  try {
    //create a server
    const server = app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
    //we create a service class to config all socket related work
    // we  pass [server] intance to socketservice class to attched with socket server
    socketservice.socketservice(server);
  } catch (err) {
    // Handle server startup errors
    console.error("Server error:", err);
  }
}

startServer();

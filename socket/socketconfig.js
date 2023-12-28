const socketIO = require("socket.io");

//this method connect socket with main server
function socketconfig(server) {
  const io = socketIO(server);

  return io; //return socket io instance which we will use through whole app 
}

module.exports = socketconfig;

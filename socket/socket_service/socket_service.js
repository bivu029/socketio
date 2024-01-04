const socketHome = require("../socket_name_space/socket_basic");
const socketCustom1=require("../socket_name_space/socket_custom_name/socket_custom1");
const socketCustomRoom= require('../socket_name_space/socket_custom_name/socket_custom_room2');
const socketio = require("../socketconfig");
class SocketService {

    //This is socketservice method which handle all socket method 
  static socketservice = (server) => {
    //how many user connected  
    var users = 0;
    // create socket instance and attached it with main server
    var io = socketio(server);
    //create basic socket chat or message method which require [users,io] instance
    // its end point- http://localhost:3000/
    socketHome(users, io);
    //create custom  name space like new end ponit
    // end point -http://localhost:3000/custom1
    socketCustom1(users,io);
    //create room or chanel in which one or multiple user can be connected 
    socketCustomRoom(io,users);// end point -http://localhost:3000/customroom
    
    
  };
}

module.exports = SocketService;

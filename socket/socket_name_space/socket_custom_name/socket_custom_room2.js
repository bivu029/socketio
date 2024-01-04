function customRoom(io, users) {
    const customRoom=  io.of('/customroom');
  let roomNo = 0;
  let full = 0;
  customRoom.on("connection", (socket) => {
    console.log("user connected");
    //create room or chanel where one- one or multiple user can be connected
    //user connect to room that if any user connected ,they will enter this room or chanel
    socket.join(`room no is ${roomNo}`);
    // now we need to create some event like chat
    customRoom
      .in(`room no is ${roomNo}`)
      .emit("connected room", { message: `u are connected to room ${roomNo}` });

      full++;//eachtime user connected this customRoom.on() will be fired and full=0 value increase
      //we want that a room contain max 2 user - so we do like this
      if (full>=2) {
        roomNo++; // we increase value of roomNo and create new room and alloted new user to this room

      }
    //create msg connection
    socket.on('connected room',(data)=>{

        customRoom.emit('connected room',data);
    });


      socket.on("disconnect", () => {
        console.log("user disconnected");
        roomNo--;
        //when user disconnect
     
      });

  });
  customRoom.on("error", (err) => {
        console.error("Socket.IO error:", err);
      });
}
module.exports=customRoom;

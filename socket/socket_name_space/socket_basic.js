


 function socketHome (users,io){

      //create socket connection
      io.on("connection", async (socket) => {
        console.log("a user connected");
        //we user connected add user
        users++;
  
        //now if we want to show a welcome or custom msg to  only newly added user ,not existing user
        //we need create custom emit event
        socket.emit("new user connected", { message: "hi , welcome" });
        //now if want to only show msg to existing users in socket that a new user connected
        socket.broadcast.emit("new user connected", {
          message: users + "user connected",
        }),
        //note if we need show msg to all user including existing, new we need use
        // io.sockets.emit('broadcast',`${users} connected`)
  
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

}
module.exports=socketHome;
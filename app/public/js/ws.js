window.addEventListener("load",function(){
  var socket = io();
  socket.emit("connection");
  if(socket)
    console.log("Client side initialized.");
});


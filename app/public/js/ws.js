window.addEventListener("load",function(){
  var socket = io();
  socket.emit("connection");
  
});


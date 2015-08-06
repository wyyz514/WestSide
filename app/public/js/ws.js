document.addEventListener("DOMContentLoaded",function(){
  var socket = io.connect("127.0.0.1:5000");
  socket.emit("connection");
});


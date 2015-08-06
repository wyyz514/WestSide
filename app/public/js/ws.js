document.addEventListener("DOMContentLoaded",function(){
  var socket = io.connect("127.0.0.1:5000/success");
  socket.emit("connection");
});


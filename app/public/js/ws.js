var socket = io.connect("http://localhost:5000");
socket.emit("connection");
socket.on("authenticated",function(msg){
  console.log(msg.user);
});

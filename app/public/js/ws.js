var socket = io.connect("http://localhost");
socket.emit("connection");
socket.on("authenticated",function(msg){
  console.log(msg.user);
});

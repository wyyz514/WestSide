var socket = io.connect("https://localhost");
socket.emit("connection");
socket.on("authenticated",function(msg){
  console.log(msg.user);
});

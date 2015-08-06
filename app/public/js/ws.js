var socket = io.connect("https://cdn.socket.io/");
socket.emit("connection");
socket.on("authenticated",function(msg){
  console.log(msg.user);
});

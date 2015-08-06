var socket = io.connect("http://127.0.0.1/");
socket.emit("connection");
socket.on("authenticated",function(msg){
  console.log(msg.user);
});

var socket = io.connect("https://127.0.0.1:5000/success");
socket.emit("connection");
socket.on("authenticated",function(msg){
  console.log(msg.user);
});

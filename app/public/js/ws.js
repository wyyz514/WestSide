var socket = io();
socket.on("authenticated",function(msg){
  console.log(msg.user);
});

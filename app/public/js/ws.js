window.addEventListener("load",function(){
  var socket = io();
  if(document.querySelector("input[type='hidden']").value)
    socket.emit("authenticated",{token:document.querySelector("input[type='hidden']").value});
  
  var button = document.querySelector("button");
  button.addEventListener("click",function(){
    socket.emit("me");
  });
  
  socket.on("you",function(msg){
    var details = JSON.parse(msg.you);
    document.body.innerHTML += details;
  });
});


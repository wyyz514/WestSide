window.addEventListener("load",function(){
  if(location.pathname.search("success") < 0)
    return;
  var socket = io();
  if(document.querySelector("input[type='hidden']").value)
    socket.emit("authenticated",{code:document.querySelector("input[type='hidden']").value});
  
  var button = document.querySelector("button");
  button.addEventListener("click",function(){
    socket.emit("me");
  });
  
  socket.on("you",function(msg){
    var details = JSON.parse(msg.you);
    document.body.innerHTML += details;
  });
});


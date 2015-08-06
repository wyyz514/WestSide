window.addEventListener("load",function(){
  var socket = io();
  if(document.querySelector("input[type='hidden']").value)
    socket.emit("authenticated",{token:document.querySelector("input[type='hidden']").value});
});


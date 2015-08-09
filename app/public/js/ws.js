window.addEventListener("load",function(){
  function displaySongs(songs)
  {
    var dataContainer = document.querySelector("div#songs");
    songs.forEach(function(song){
      var anchor = document.createElement("a");
      anchor.setAttribute("href",song.permalink_url);
      anchor.innerText = song.title;
      dataContainer.appendChild(anchor);
      dataContainer.innerHTML += "<br>";
    });
  }
  
  if(location.pathname.search("success") < 0)
    return;
  var socket = io();
  if(document.querySelector("input[type='hidden']").value)
    socket.emit("authenticated",{code:document.querySelector("input[type='hidden']").value});
  
  var button = document.querySelector("button");
  button.addEventListener("click",function(){
    location.href = "/app";
  });
 
  socket.on("songs",function(msg){
    var songs = JSON.parse(msg.songs);
    displaySongs(songs);
  });
});


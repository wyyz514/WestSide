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
  
  var socket = io();
 
  socket.on("songs",function(msg){
    var songs = JSON.parse(msg.songs);
    displaySongs(songs);
  });
});
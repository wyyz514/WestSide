window.addEventListener("load",function(){
  var socket = io();
  socket.emit("authed");
  
  var ClientManager = (function(socket){
    
    function queueSong(event){
      var promise = new Promise(function(resolve,reject){
        var target = event.target;
        var song;
        if(target.hasAttribute("data-ws-href"))
        {
          song = target.getAttribute("data-ws-href");
          resolve(song);
        }
        else
        {
          if(!target.classList.contains("ws-song-row"))
          {
            var parent = target.parentElement;
            while(!parent.classList.contains("ws-song-row"))
            {
              parent = parent.parentElement;
            }
            song = parent.querySelector(".ws-song-info").getAttribute("data-ws-href");
            resolve(song);
          }
          else
          {
            song = target.querySelector(".ws-song-info").getAttribute("ws-song-href");
            resolve(song);
          }
        }
      });
      return promise;
    }
    
    function initListeners()
    {
      var rows = document.querySelectorAll("div.ws-song-row");
      Array.prototype.forEach.call(rows,function(row){
        row.addEventListener("click",function(ev){
          queueSong(ev).then(function(song){
            console.log(song);
            socket.emit("queue",{song:song});
            var added = row.querySelector("div.ws-song-status-icon#ws-song-added i");
            added.style.display = "inline-block";
          });
        });
      },false);
    }
    
    return {
      initListeners:initListeners
    }
  })(socket);
  
  ClientManager.initListeners();
});

window.addEventListener("load",function(){
  var socket = io();
  socket.emit("authed");
  socket.on("updated-q",function(msg){
    var queue = JSON.parse(msg.queue);
    ClientManager.syncQueue(queue);
  });
  
  socket.on("sync",function(msg){
    console.log("Syncing");
    var queue = JSON.parse(msg.queue);
    console.log(queue);
    ClientManager.syncQueue(queue);
  });
  
  var ClientManager = (function(socket){
    
    function queueSong(event){
      var promise = new Promise(function(resolve,reject){
        var target = event.target;
        var song = {};
        if(target.hasAttribute("data-ws-href"))
        {
          song.link = target.getAttribute("data-ws-href");
          song.title = target.querySelector(".ws-song-info .ws-song-title").innerText;
          song.id = target.parentElement.getAttribute("data-ws-id");
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
            song.link = parent.querySelector(".ws-song-info").getAttribute("data-ws-href");
            song.title = parent.querySelector(".ws-song-title").innerText;
            song.id = parent.getAttribute("data-ws-id");
            resolve(song);
          }
          else
          {
            song.link = target.querySelector(".ws-song-info").getAttribute("data-ws-href");
            song.title = target.querySelector(".ws-song-title").innerText;
            song.id = target.getAttribute("data-ws-id");
            resolve(song);
          }
        }
      });
      return promise;
    }
    
    function syncQueue(queue)
    {
      var checkIcons = document.querySelectorAll(".ws-song-status-icon#ws-song-added i");
      Array.prototype.forEach.call(checkIcons,function(el){
        el.style.display = "none";
      });
      
      queue.forEach(function(song){
        var songRow = document.querySelector("div[data-ws-id="+"'"+song.id+"'"+"]");
        if(songRow)
        {
          songRow.querySelector(".ws-song-status-icon#ws-song-added i").style.display = "inline-block";
        }
      });
    }
    
    function initListeners()
    {
      var rows = document.querySelectorAll("div.ws-song-row");
      Array.prototype.forEach.call(rows,function(row){
        row.addEventListener("click",function(ev){
          queueSong(ev).then(function(song){
            console.log(song);
            var _song = JSON.stringify(song);
            socket.emit("queue",{song:_song});
            var added = row.querySelector("div.ws-song-status-icon#ws-song-added i");
            added.style.display = "inline-block";
          });
        });
      },false);
    }
    
    return {
      initListeners:initListeners,
      syncQueue:syncQueue
    }
  })(socket);
  
  ClientManager.initListeners();
});

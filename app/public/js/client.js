window.addEventListener("load",function(){
  var queue = [];
  var socket = io();
  socket.emit("authed");  
  socket.on("sync",function(msg){
    console.log("Sync received");
    var queue = JSON.parse(msg.queue);
    console.log(queue);
    ClientManager.syncQueue(queue);
    ClientManager.updateQueue(queue);
  });
  
  var ClientManager = (function(socket){
    
    function extractSongDetails(target)
    {
      var _target = target;
      var song = {};
      while(!_target.classList.contains("ws-song-row"))
      {
        _target = _target.parentElement;
      }
      
      song.link = _target.querySelector(".ws-song-info").getAttribute("data-ws-href");
      song.title = _target.querySelector(".ws-song-info .ws-song-title").innerText;
      song.id = _target.getAttribute("data-ws-id");
      song.img = _target.querySelector(".ws-song-avatar img").getAttribute("src");
      song.artist = _target.querySelector(".ws-song-artist").innerText;
      
      return song;
    }
    
    function queueSong(event){
      var promise = new Promise(function(resolve,reject){
        var target = event.target;
        var song = extractSongDetails(target);
        resolve(song);
      });
      return promise;
    }
    
    function syncQueue(queue)
    {
      console.log("Syncing");
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
    
    function updateQueue(queue)
    {
      var queueSize = queue.length;
      var first = queue[queueSize - 1];
      var last = queue[0];
      var marker = 0;
      var elQueue = document.querySelector("#ws-queue");
      var elFirst = elQueue.firstElementChild;
      var elLast = elQueue.lastElementChild;
      if(elQueue.childElementCount > 0)
      {
        while(elFirst.getAttribute("data-ws-id") !== first.id)
        {
          console.log("Removing:",elFirst);
          elQueue.removeChild(elFirst);
          elFirst = elQueue.firstElementChild;
        }
        
        while(marker < queueSize 
              && queue[marker].id !== elLast.getAttribute("data-ws-id"))
        {
          marker++;
        }
        for(var index = marker - 1; index >= 0; index--)
        {
          renderRow(queue[index]);
        }
      }
      else
      {
        console.log("No songs in queue. Adding songs");
        for(var index = queueSize - 1; index >= 0; index--)
        {
          renderRow(queue[index]);
        }
      }
    }
    
    function renderRow(song)
    {
      console.log("Rendering row");
      var parent = document.querySelector("#ws-queue");
      var songArt = document.createElement("div");
      songArt.classList.add("ws-queue-song-artwork");
      var songArtImg = document.createElement("img");
      songArtImg.setAttribute("src",song.img);
      songArt.appendChild(songArtImg);
      var queueRow = document.createElement("div");
      var queueSong = document.createElement("div");
      var queueSongArtist = document.createElement("div");
      var queueSongDetails = document.createElement("div");
      queueSongDetails.classList.add("ws-queue-song-details");
      queueRow.classList.add("ws-queue-row");
      queueRow.setAttribute("data-ws-id",song.id);
      queueSong.classList.add("ws-queue-song");
      queueSongArtist.classList.add("ws-queue-song-artist");

      queueSong.innerText = song.title;
      queueSongArtist.innerText = song.artist;
      parent.appendChild(queueRow);
      queueRow.appendChild(songArt);
      queueSongDetails.appendChild(queueSong);
      queueSongDetails.appendChild(queueSongArtist);
      queueRow.appendChild(queueSongDetails);
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
      
      var footer = document.querySelector("#ws-footer");
      footer.addEventListener("click",function(){
        if(this.classList.contains("ws-queue-active"))
          this.classList.remove("ws-queue-active");
        else
          this.classList.add("ws-queue-active");
      });
    }
    
    return {
      initListeners:initListeners,
      syncQueue:syncQueue,
      updateQueue:updateQueue
    }
  })(socket);
  
  ClientManager.initListeners();
});

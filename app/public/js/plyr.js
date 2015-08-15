window.addEventListener("load",function(){
  var socket = io();
  var queue = [];
  socket.emit("player");
  socket.on("tracks",function(msg){
    queue = JSON.parse(msg.queue);
    PlayerManager.queue = queue;
    PlayerManager.renderQueue();
    PlayerManager.pollSong();
  });

  socket.on("sync",function(msg){
    queue = JSON.parse(msg.queue);
    PlayerManager.renderQueue(diff(PlayerManager.queue,queue));
  });
  
  function diff(q1,q2)
  {
    var difference = [];
    var q1size = q1.length;
    var q2size = q2.length;
    var discr = q2size - q1size;
    
    if(discr > 0)
    {
      for(var index = discr; index >= 0; index--)
      {
        difference.push(q2[index]);
      }
    }  
    return difference;
  }
  
  var PlayerManager = (function(socket){
    
    function getQueue()
    {
      return this.queue;
    }
    
    function getIframe()
    {
      if(!this.iframe)
        this.iframe = document.createElement("iframe");
      return this.iframe;
    }
    
    function init()
    {
      var parent = document.querySelector(".ws-player-queue");
      parent.removeChild(parent.firstElementChild);
      var urlBase = "https://w.soundcloud.com/player/?url=";
      if(this.queue.length === 0)
        return;
      if(!this.widget)
      {
        var iframe = getIframe();
        iframe.setAttribute("src",urlBase+this.queue.pop().link+"&auto_play=true");
        console.log(iframe.src);
        this.widget = SC.Widget(iframe);
        document.body.appendChild(iframe);
        this.widget.bind(SC.Widget.Events.FINISH,function(){
          pollSong();
        });
      }
      else
      {
        this.widget.load(this.queue.pop().link,{auto_play:true});
      }
      socket.emit("dequeue");
      return this.widget;
    }
    
    function renderQueue()
    {
      var args = arguments[0];
      if(args
      if(args
      && Object.prototype.toString.call(args) == "[object Array]")
      {
        var len = args.length;
        for(var index = 0; index < len; index++)
        {
          (function(obj){
            console.log(obj);
            var song = args.pop();
            obj.queue.unshift(song);
            renderRow(song);
          })(this);
        }
      }
      else
      {
        var qlength = PlayerManager.queue.length;
        for(var index = qlength - 1; index >=0; index--)
        {
          (function(i){
            renderRow(PlayerManager.queue[i]);
          })(index);
        }
      }
    }
    
    function renderRow(song)
    {
      var parent = document.querySelector(".ws-player-queue");
      var songRow = document.createElement("div");
      songRow.classList.add("ws-player-song-row");
      var songInfo = document.createElement("div");
      songInfo.classList.add("ws-player-song-info");
      var songName = document.createElement("div");
      songName.classList.add("ws-player-song-name");
      var songArtist = document.createElement("div");
      songArtist.classList.add("ws-player-song-artist");
      songName.innerText = song.title;
      songArtist.innerText = song.artist;
      songInfo.appendChild(songName);
      songInfo.appendChild(songArtist);
      songRow.appendChild(songInfo);
      parent.appendChild(songRow);
    }
    
    function pollSong()
    {
      var poll = setInterval(function(){
        if(queue.length > 0)
        {
          PlayerManager.init();
          clearInterval(poll);
        }
      },3000);
    }
    
    return {
      init:init,
      renderQueue:renderQueue,
      pollSong:pollSong
    }
  })(socket);
  
  window.PM = PlayerManager;
  PlayerManager.init = PlayerManager.init.bind(PlayerManager);
  
});
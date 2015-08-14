window.addEventListener("load",function(){
  var socket = io();
  var queue = [];
  socket.emit("player");
  socket.on("tracks",function(msg){
    console.log("Tracks");
    queue = JSON.parse(msg.queue);
    PlayerManager.updateQ(queue);
  });

  socket.on("sync",function(msg){
    console.log("Tracks");
    queue = JSON.parse(msg.queue);
    PlayerManager.updateQ(queue);
  });
  
  var PlayerManager = (function(socket){
    
    function updateQ(queue)
    {
      this.queue = queue;
      console.log(this.queue);
    }
    
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
      var urlBase = "https://w.soundcloud.com/player/?url=";
      if(!this.widget)
      {
        var iframe = getIframe();
        iframe.setAttribute("src",urlBase+this.queue.pop().link+"&auto_play=true");
        console.log(iframe.src);
        this.widget = SC.Widget(iframe);
        document.body.appendChild(iframe);
        this.widget.play();
      }
      else
      {
        this.widget.load(this.queue.pop().link,{auto_play:true});
        console.log(getIframe().src);
      }
      socket.emit("deque");
      return this.widget;
    }
    
    return {
      init:init,
      updateQ:updateQ
    }
  })(socket);
  
  window.PM = PlayerManager;
});
//getting needed files
var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);
var port = process.env.PORT||3000;
var path = require("path");
var SC = require("node-soundcloud");
var User = require("./user.js");
var client = require("./interface.js");
var QueueManager = require("./queue.js");
var songQueue = new QueueManager();
var user;
//express config
app.set("view engine","jade");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(__dirname+"/public"));
//run the server
server.listen(port,function(){
  console.log("Listening on port",port);
});

SC.init({
  id:"34b370aa58ea274d0480fdd2fe51722a",
  secret:"97708910783570592a82d0a37f462f57",
  uri:"http://127.0.0.1:5000/success"
//  uri:"https://dry-tor-1298.herokuapp.com/success"
});
//request handlers
app.get("/",function(req,res){
  res.writeHead(302,{Location:SC.getConnectUrl()});
  res.end();
});
//authentication
app.get("/success",function(req,res){
  user = new User();
  if(req.query.code)
  {
    user.code = req.query.code;
    res
    .render("success",
      {
        token:req.query.code,
        title:"Success"
      }
    );
  }
 SC.authorize(user.code,function(err,accessToken){
    if(err)
    {
      console.log(err);
    }
    else
    {
      user.token = accessToken;
      SC.get("/me?oauth_token="+user.token,function(err,data){
        console.log("User token: ",user.token);
        user = user.extendSC(data);
        client.getFavs(user).then(function(favs){
          user.favs = favs;
        });
      });
    }
  });
});

io.on("connection",function(socket){
  console.log("Got connection",socket.id);
  socket.on("player",function(){
    if(songQueue)
      socket.emit("tracks",{queue:JSON.stringify(songQueue.getQueue())});
  });
  
  socket.on("authed",function(){
    console.log("Authed");
    user.socket = socket;
    user.nickname = "Anon Y. Mous"; 
   
    if(songQueue)
    {
      socket.emit("sync",{queue:JSON.stringify(songQueue.getQueue()),np:app.now_playing});
      socket.broadcast.emit("sync",{queue:JSON.stringify(songQueue.getQueue()),np:app.now_playing});
    }
  });
  socket.on("queue",function(msg){
    var song = JSON.parse(msg.song);
    songQueue.enqueue(song);
    this.emit("sync",{queue:JSON.stringify(songQueue.getQueue())});
    this.broadcast.emit("sync",{queue:JSON.stringify(songQueue.getQueue())});
  });
  socket.on("dequeue",function(){
    var song = songQueue.dequeue();
    app.now_playing = song;
    socket.emit("sync",{queue:JSON.stringify(songQueue.getQueue()),np:song});
    socket.broadcast.emit("sync",{queue:JSON.stringify(songQueue.getQueue()),np:song});
  })
});

//------------------- END OF SETUP -------------------//

app.get("/app",function(req,res){
  res.render("app",{favs:user.favs,title:"Westside App"});
});

app.get("/plyr",function(req,res){
  res.render("plyr",{title:"Plyr"});
});
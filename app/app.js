var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var port = process.env.PORT||3000;
var path = require("path");
var SC = require("node-soundcloud");
var User = require("./user.js");

app.set("view engine","jade");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(__dirname+"/public"));
server.listen(port,function(){
  console.log("Listening on port",port);
});

app.get("/",function(req,res){
  res.render("index.jade",{scripts:["js/ws.js"]});
});

io.on("connection",function(socket){
  var user = new User(socket,"User");
  console.log(user.getNickName(),"has connected.");
});
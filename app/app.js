//getting needed files
var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);
var port = process.env.PORT||3000;
var path = require("path");
var User = require("./user.js");
var sc = require("./sc.js");
var users = [];

//express config
app.set("view engine","jade");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(__dirname+"/public"));
//run the server
server.listen(port,function(){
  console.log("Listening on port",port);
});
//request handlers
app.get("/",function(req,res){
  res.writeHead(302,{Location:sc.getConnectUrl()});
  res.end();
});
//authentication
app.get("/success",function(req,res){
 var user = new User();
  user.nickname = "User";
  user.authToken = req.query.code;
  if(req.query.code)
  {
    res.render("success",{scripts:["/js/socket.io/socket.io.js","js/ws.js"],token:req.query.code});
  }
});
//user initialization
io.on("connection",function(socket){
  var user;
  console.log("Got connection");
  socket.on("authenticated",function(msg){
    user = new User(socket,msg.token,"User","");
  });
  
  socket.on("me",function(){
    sc.makeRequest(user.authToken);
  });
});

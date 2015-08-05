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
app.use(connectHandler);
app.use(tokenHandler);

function connectHandler(req,res,next)
{
  console.log("Authorizing...(1)");
  var scAuth = SC.getConnectUrl()+"display=popup";
  res.writeHead(301,{Location:scAuth});
  res.end();
  next();
}

io.on("connection",function(socket){
  var user = new User(socket,"User");
  console.log(user.getNickName(),"has connected.");
});

SC.init({
  id:"34b370aa58ea274d0480fdd2fe51722a",
  secret:"97708910783570592a82d0a37f462f57",
  uri:"https://dry-tor-1298.herokuapp.com/"
});

app.get("/",connectHandler);
var express = require("express")
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var port = process.env.PORT||3000;
var path = require("path");
app.set("view engine","jade")
app.set("views",path.join(__dirname,"/views"));
app.use("js",express.static(__dirname+"/js"));

server.listen(port,function(){
  console.log("Listening on port",port);
});

app.get("/",function(req,res){
  res.render("index.jade");
});

io.on("connection",function(socket){
  console.log("A connection");
});
var express = require("express")
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var port = process.env.PORT||3000;
var path = require("path");
app.set("view engine","jade");
app.set("views",express.static(__dirname)+"/views");
app.use("public",express.static(__dirname+"/public"));
server.listen(port,function(){
  console.log("Listening on port",port);
});

app.get("/",function(req,res){
  res.render("index.jade",{dir:__dirname,scripts:["public/js/ws.js"]});
});

io.on("connection",function(socket){
  console.log("A connection");
});
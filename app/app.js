var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);
var port = process.env.PORT||3000;
var path = require("path");
var User = require("./user.js");
var sc = require("./sc.js");

app.set("view engine","jade");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(__dirname+"/public"));

server.listen(port,function(){
  console.log("Listening on port",port);
});

app.get("/",function(req,res){
  res.writeHead(302,{Location:sc.getConnectUrl()});
  res.end();
});

app.get("/success",function(req,res){
  if(req.params.code)
    res.render("success",{code:req.params.code});
});

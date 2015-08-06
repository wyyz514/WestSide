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
});
//request handlers
app.get("/",function(req,res){
  res.writeHead(302,{Location:SC.getConnectUrl()});
  res.end();
});
//authentication
app.get("/success",function(req,res){
  if(req.query.code)
  {
    res
    .render("success",
      {
        scripts:["/js/socket.io/socket.io.js","js/ws.js"],
        token:req.query.code
      }
    );
  }
});
//user initialization
io.on("connection",function(socket){
  console.log("Got connection");
  socket.on("authenticated",function(msg){
    user = new User(socket,msg.code,"User","");
    SC.authorize(user.code,function(err,accessToken){
      if(err)
      {
        console.log(err);
      }
      else
      {
        user.token = accessToken;
      }
    });
  });
  
  socket.on("me",function(){
    SC.get("/me?oauth_token="+user.token,function(err,data){
      var user2 = user.extendSC(data);
      console.log(user2);
    });
  });
});

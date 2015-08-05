var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);
var port = process.env.PORT||3000;
var path = require("path");
var SC = require("machinepack-soundcloud");
var User = require("./user.js");

app.set("view engine","jade");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(__dirname+"/public"));
server.listen(port,function(){
  console.log("Listening on port",port);
});

SC.getLoginUrl({
  clientId:"34b370aa58ea274d0480fdd2fe51722a",
  callbackUrl:"localhost:5000/success",
  display:"popup",
  responseType:['code']
})
.exec({
  error:function(err){
    console.log(err);
  },
  success:function(url)
  {
    http.get(url,function(err,data){
      console.log(data);
    });
  }
});
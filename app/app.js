var http = require("http");
var io = require("socket.io");
var port = process.env.PORT||3000;

var server = http
.createServer(function(req,res){
  res.writeHead(200,{"Content-Type":"text/html"});
  res.end("Hello World");
});

io(server);

server.listen(port,function(){
  console.log("Listening on port",port);
});


io.on("connection",function(socket){
  console.log("A connection");
});
var http = require("http");
var io = require("socket.io")(http);
var port = process.env.PORT||3000;

http.createServer(function (rq,rs){
  rs.writeHead({"Content-type":"text/html"});
  rs.end("Hello World");
})
.listen(port,function(){
  console.log("Listening on port",port);
});
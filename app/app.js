var http = require("http").createServer(handler);
var io = require("socket.io")(http);
var port = process.env.PORT||3000;

function handler(rq,rs)
{
  rs.writeHead({"Content-type":"text/html"});
  rs.send("Hello World");
}

http.listen(port,function(){
  console.log("Listening on port",port);
});
var http = require("http");
var port = process.env.PORT||3000;

http
.createServer(function(req,res){
  res.writeHead({"Content-Type":"text/html"});
  res.end("Hello World");
})
.listen(port,function(){
  console.log("Listening on port",port);
});
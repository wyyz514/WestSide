var https = require("https");
var qs = require("qs");
var sc = (function(){
  var consts = {
    soundcloudUrl:"https://soundcloud.com/connect",
    clientID:"34b370aa58ea274d0480fdd2fe51722a",
    redirect:"http://127.0.0.1:5000/success",
    responseType:"code",
    API:"https://api.soundcloud.com/",
    oAuth:"oauth2/token",
    secret:"97708910783570592a82d0a37f462f57"
  }
  
  function getConnectUrl()
  {
    return consts.soundcloudUrl+"?client_id="+consts.clientID+"&redirect_uri="+consts.redirect+"&response_type="+consts.responseType;
  }
  
  function getToken(code)
  {
    var oAuth = {
      client_id:consts.clientID,
      redirect_uri:consts.redirect,
      code:code,
      client_secret:consts.secret,
      grant_type:'authorization_code'
    }
    var oAuth_s = qs.stringify(oAuth);
    var options = {
      hostname:consts.API,
      path:consts.oAuth+"?"+oAuth_s,
      headers:{
        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
        "Content-Length":oAuth_s.length
      }
    }
    
    var req = https.request(options,function(res){
      res.on("data",function(chunk){
        console.log(chunk);
      });
    });
    
    req.on("error",function(err){
      console.log("Error",err);
    });
    
    req.write(oAuth_s);
    req.end();
    
  return {
    getConnectUrl:getConnectUrl,
    getToken:getToken
  };
})();

module.exports = sc;
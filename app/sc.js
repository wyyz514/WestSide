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
    return config.soundcloudUrl+"?client_id="+config.clientID+"&redirect_uri="+config.redirect+"&response_type="+config.responseType;
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
    
    var options = {
      hostname:consts.API,
      path:consts.oAuth,
      method:"POST",
      qs:oAuth
    };
    
    var req = https.request(oAuth,function(res){
      console.log(res);
    });
    req.end();
  }
  
  return {
    getConnectUrl:getConnectUrl,
    getToken:getToken
  };
})();

module.exports = sc;
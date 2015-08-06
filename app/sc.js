var request = require("request");
var sc = (function(){
  var config = {
    soundcloudUrl:"https://soundcloud.com/connect",
    clientID:"34b370aa58ea274d0480fdd2fe51722a",
    redirect:"http://127.0.0.1:5000/success",
    responseType:"code",
    oAuth:"https://api.soundcloud.com/oauth2/token",
    secret:"97708910783570592a82d0a37f462f57"
  }
  
  function getConnectUrl()
  {
    return config.soundcloudUrl+"?client_id="+config.clientID+"&redirect_uri="+config.redirect+"&response_type="+config.responseType;
  }
  
  function getToken(code)
  {
  request.post({url:config.oAuth,
      form:{
        client_id:config.clientID,
        redirect_uri:config.redirect,
        grant_type:'authorization_code',
        client_secret:config.secret,
        code:code
      },
      function(err,response,body){
        if(err)
        {
          console.log(err);
        }
        else
        {
          console.log(response);
        }
      }
    });
      
  }
  
  function makeRequest(token)
  {
    var url = "https://api.soundcloud.com/me?oauth_token="+token;
    request.get(url,function(err,data){
      if(err)
      {
        console.log(err);
      }
      else
      {
        console.log(data);
      }
    });
  }
  
  return {
    getConnectUrl:getConnectUrl,
    getToken:getToken,
    makeRequest:makeRequest
  };
})();

module.exports = sc;
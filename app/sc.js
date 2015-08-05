var request = require("request");


var sc = (function(){
  var soundcloudUrl = "https://soundcloud.com/connect";
  var clientID = "34b370aa58ea274d0480fdd2fe51722a";
  var redirect = "http://127.0.0.1:5000/success";
  var responseType = "code";
  sc.isAuthed = false;
  function getConnectUrl()
  {
    return soundcloudUrl+"?client_id="+clientID+"&redirect_uri="+redirect+"&response_type="+responseType;
  }
  
  return {
    getConnectUrl:getConnectUrl
  };
})();

module.exports = sc;
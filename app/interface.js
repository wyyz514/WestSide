var SC = require("node-soundcloud");
var q = require("q");
var scClient = (function(){
  var favsCache = [];
  
  function getFavs(user)
  {
    var defer = q.defer();
    if(favsCache.length === 0)
    {
      var url = "/users/"+user.id+"/favorites";
      SC.get(url,function(err,data){
        favsCache = data;
        defer.resolve(favsCache);
      });
    } 
    else
    {
      defer.resolve(favsCache);
    }
      
    return defer.promise;
  }
  
  return {
    getFavs:getFavs
  };
})(); 


module.exports = scClient;
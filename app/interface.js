var SC = require("node-soundcloud");

var scClient = (function(){
  var favsCache = [];
  
  function getFavs(user)
  {
    if(!favsCache)
    {
      var url = "/users/"+user.id+"/favorites";
      SC.get(url,function(err,data){
        console.log(data);
      });
    } 
  }
  
  return {
    getFavs:getFavs
  };
})(); 


module.exports = scClient;
function User(connection,code,nickname)
{
  this.socket = connection;
  this.nickname = nickname;
  this.code = code;
}

User.prototype.getNickName = function()
{
  return this.nickname;
}

User.prototype.getID = function()
{
  return this.connection.id;
}

User.prototype.extendSC = function(scObject)
{
  if(typeof scObject == 'object') {
    for(var prop in scObject) {
      if(scObject.hasOwnProperty(prop))
        this[prop] = scObject[prop];
    }
  return this;
  }
}

module.exports = User;
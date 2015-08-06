function User(connection,code,nickname)
{
  this.connection = connection;
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

User.prototype.getMe = function()
{
  if(arguments[0] 
     && typeof arguments[0] == "object")
    this = extend(this,arguments[0]);
  return this;
}

function extend(obj1,obj2)
{
  for(var prop in obj2)
  {
    if(obj2.hasOwnProperty(prop))
    {
      obj1[prop] = obj2[prop];
    }
  }
  return obj1;
}

module.exports = User;
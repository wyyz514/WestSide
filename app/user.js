function User(connection,authToken,nickname,scId)
{
  this.connection = connection;
  this.nickname = nickname;
  this.scId = scId;
  this.authToken = authToken;
}

User.prototype.getNickName = function()
{
  return this.nickname;
}

User.prototype.getID = function()
{
  return this.connection.id;
}

User.prototype.getSCID = function()
{
  return this.scId;
}

module.exports = User;
function User(connection,nickname)
{
  this.connection = connection;
  this.nickname = nickname;
}

User.prototype.getNickName = function()
{
  return this.nickname;
}

User.prototype.getID = function()
{
  return this.connection.id;
}

module.exports = User;
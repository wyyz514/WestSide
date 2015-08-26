function QueueManager()
{
  this.queue = [];
  this.song_ids = [];
}

QueueManager.prototype.enqueue = function(item)
{
  console.log(this.song_ids.indexOf(item.id),item.title);
  if(this.song_ids.indexOf(item.id) < 0)
  {
    this.song_ids.push(item.id);
    this.queue.unshift(item);
  }
  console.log(this.queue.length);
};

QueueManager.prototype.dequeue = function()
{
  var song = "";
  if(this.queue.length !== 0)
  {
    song = this.queue.pop();
    var id = song.id;
    var idx = this.song_ids.indexOf(id);
    this.song_ids.splice(idx,1);
    console.log("Removing:",song.title);
  }
  else
    console.log("Queue is empty");
  return song;
}

QueueManager.prototype.getQueue = function(){
  return this.queue;
}

module.exports = QueueManager;
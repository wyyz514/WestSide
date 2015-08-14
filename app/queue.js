function QueueManager()
{
  this.queue = [];
  this.song_ids = [];
}

QueueManager.prototype.enqueue = function(item)
{
  
  if(this.song_ids.indexOf(item.id) < 0)
  {
    this.song_ids.push(item.id);
    this.queue.unshift(item);
  }
  console.log(this.queue.length);
};

QueueManager.prototype.dequeue = function()
{
  if(this.queue.length !== 0)
  {
    var song = this.queue.pop();
    var song_id = song.id;
    if(this.song_ids.indexOf(song_id) >= 0)
    {
      this.song_ids = this.song_ids.slice(this.song_ids.indexOf(song_id),1)
      return song;
    }
  }
  else
    console.log("Queue is empty");
}

QueueManager.prototype.getQueue = function(){
  return this.queue;
}

module.exports = QueueManager;
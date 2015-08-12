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
    return this.queue.pop();
  else
    console.log("Queue is empty");
}

QueueManager.prototype.getQueue = function(){
  return this.queue;
}

module.exports = QueueManager;
function QueueManager()
{
  this.queue = [];
}

QueueManager.prototype.enqueue = function(item)
{
  if(this.queue.indexOf(item) < 0)
    this.queue.unshift(item);
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
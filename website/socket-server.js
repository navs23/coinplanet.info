(function(sockertServer){
const events = require('events');
var eventEmitter = new events.EventEmitter();
var io;
sockertServer.init = function(server,app){

var connections=20;
io = require('socket.io')(server);

io.on('connection', function(socket) {  
    console.log('connected %s',connections);
    io.emit("data",++connections); 

    socket.on('disconnect', function(){
    
    console.log('disconnected %s',connections);
    
    io.emit("data",--connections); 
  
    });

  
  
});

app.on('cache-refreshed',function(){
  console.log('event captured');
  io.emit('cache',app.cache);
});
return io;

};


}(module.exports));
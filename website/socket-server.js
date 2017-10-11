(function(sockertServer){

sockertServer.init = function(server){

var connections=20;
var io = require('socket.io')(server);

io.on('connection', function(socket) {  
    console.log('connected %s',connections);
    io.emit("data",++connections); 

    socket.on('disconnect', function(){
    
    console.log('disconnected %s',connections);
    
    io.emit("data",--connections); 
  
    });

  
  
});




};


}(module.exports));
(function(sockertServer){

sockertServer.init = function(server){


var io = require('socket.io')(server);

console.log('ss intialising.');
io.on('connection', function(client) {  
    console.log('Client connected...');
var ctr=1;
setInterval(function(){
    

  io.emit("data",ctr++); 

},5*1000);
  

});


};


}(module.exports));
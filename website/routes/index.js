(function(main){

var home = require("./home.js");
var exchange = require("./exchange.js");

main.init =function(router){
        home.init(router);
        exchange.init(router);
    
}


    
}(module.exports))


 

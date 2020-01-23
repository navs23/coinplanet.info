(function(main){

var home = require("./home.js");
var exchange = require("./exchange.js");
var api = require("./api.js");
main.init =function(router){
        home.init(router);
        exchange.init(router);
        api.init(router);
    
}


    
}(module.exports))


 

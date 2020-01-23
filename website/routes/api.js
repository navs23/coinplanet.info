(function(api){

var service = require("./../../service/currentPrice");

api.init= function(router){
	
	console.log("initialising %s route","api");
	router.get('/_api/fiatrates/', function(req, res) {
  res.json(service.getFiatExchangeRates());
  
});    
    	


    
}


    
}(module.exports))


 

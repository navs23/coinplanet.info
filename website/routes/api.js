(function(api){

var service = require("./../../service/currentPrice");

api.init= function(router){
	
	
	router.get('/_api/fiatrates/:ccy', function(req, res) {
  res.json(service.getFiatExchangeRates());
  
});    
    	


    
}


    
}(module.exports))


 

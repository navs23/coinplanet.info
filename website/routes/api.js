(function(api){

var service = require("./../../service/currentPrice");

api.init= function(router){
	
	console.log("initialising %s route","api");
	router.get('/_api/fiatrates/:/ccy', function(req, res) {
    let ratesPromise = service.getFiatExchangeRates();
    ratesPromise.then(rates=>{
        res.json(rates);    
    });
    ratesPromise.catch(err=>{
        
        res.json({"error":err});    
    })
  
  
});    
    	


    
}


    
}(module.exports))


 

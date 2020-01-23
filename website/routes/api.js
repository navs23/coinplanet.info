(function(api){

var service = require("./../../service/currentPrice");

api.init= function(router){
	
	router.get('/_api/fiatrates/:CCY?', function(req, res) {
    let {CCY} = req.params;
    
    let ratesPromise = service.getFiatExchangeRates();
    ratesPromise.then(rates=>{
        res.json(rates);    
    });
    ratesPromise.catch(err=>{
        
        res.json({"error":err});    
    })
  
  
});    
    	
//url ='https://api.coinmarketcap.com/v1/global/';
router.get('/_api/cryptoglobal', function(req, res) {
    let {CCY} = req.params;
    
    let ratesPromise = service.getGlobalData();
    ratesPromise.then(rates=>{
        res.json(rates);    
    });
    ratesPromise.catch(err=>{
        
        res.json({"error":err});    
    })
  
  
});    
  
  router.get('/_api/cryptorates', function(req, res) {
    let {CCY} = req.params;
    
    let ratesPromise = service.getCryptoExchangeRates();
    ratesPromise.then(rates=>{
        res.json(rates);    
    });
    ratesPromise.catch(err=>{
        
        res.json({"error":err});    
    })
  
  
});  
    
}


    
}(module.exports))


 

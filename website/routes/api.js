(function(api){

var service = require("./../../service/currentPrice");

api.init= function(router){
	
	router.get('/_api/fiatrates/:CCY?', function(req, res) {
    let {CCY} = req.params;
    let url ='http://data.fixer.io/api/latest?access_key=' + process.env.DATA_FIXER_KEY;
    let ratesPromise = service.getFiatExchangeRates(url);
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
     var url ='https://api.coinmarketcap.com/v1/global/';
    let ratesPromise = service.getGlobalData(url);
    ratesPromise.then(rates=>{
        res.json(rates);    
    });
    ratesPromise.catch(err=>{
        
        res.json({"error":err});    
    })
  
  
});    
  
  router.get('/_api/cryptorates', function(req, res) {
    let {CCY} = req.params;
    let url ='https://api.coinmarketcap.com/v1/ticker/?limit=0';
    let ratesPromise = service.getCryptoExchangeRates(url);
    ratesPromise.then(rates=>{
        res.json(rates);    
    });
    ratesPromise.catch(err=>{
        
        res.json({"error":err});    
    })
  
  
});  
    
  router.get('/_api',(req,res)=>{
    console.log(JSON.stringify(router))
    res.json(router);
  })
}


    
}(module.exports))


 

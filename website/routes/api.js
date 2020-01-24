(function(api){
 const listEndpoints = require('express-list-endpoints')
 const memCache = require('memory-cache');
 var service = require("./../../service/currentPrice");

  
  // cache
let cacheMiddleware = (duration) => {
    return (req, res, next) => {
        let key =  '__express__' + req.originalUrl || req.url
        let cacheContent = memCache.get(key);
      
        if(cacheContent){
            console.log("serving from cache");
            res.send( cacheContent );
            return
        }else{
          console.log("first request - building cache");
            res.sendResponse = res.send
            res.send = (body) => {
                memCache.put(key,body,duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}
api.init= function(router){
	let cacheExpireTiem = 60 * 20;
  
	router.get('/_api/fiatrates/:CCY?',cacheMiddleware(cacheExpireTiem), function(req, res) {
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
router.get('/_api/cryptoglobal',cacheMiddleware(cacheExpireTiem), function(req, res) {
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
  
  router.get('/_api/cryptorates',cacheMiddleware(cacheExpireTiem), function(req, res) {
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
    
  router.get('/_api',cacheMiddleware(cacheExpireTiem),(req,res,next)=>{
   
        let endponits = listEndpoints(router);
        res.render('routes',{routes:endponits});
        //res.json(entponits);
    
      });
    }
    
}(module.exports))


 

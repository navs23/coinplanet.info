(function(exchnage){

    var service = require("./../../service/currentPrice");
    var trader = require("./../../service/trader");
    var _=require("underscore");

    var moment=require('moment');
    
    exchnage.init= function(router){
        
       router.get('/trade/', function(req, res, next) {
         res.render('trades', {title: 'Trade Manager',error:null ,currencyPairs:[],trades:[]});
      
    });    
    router.post('/api/returnTradeHistory/', function(req, res, next) {
        var param=req.body;
        if(param.history==0) param.history=60;
        param.start=new Date( moment().subtract(param.history || 3, 'months')).getTime() / 1000;
        param.end=new Date(Date.now).getTime() / 1000
        
     trader.returnTradeHistory(param)
           .then(response => {
             var tradesJson=JSON.parse(response.body);
             var currencyPairs=_.keys(tradesJson); 
              if (!tradesJson.error)           
                res.send({title: 'Trade history',error:null ,currencyPairs:currencyPairs,trades:tradesJson});
              else {
                res.send({title: 'Trade history',error:tradesJson.error ,currencyPairs:currencyPairs,trades:[]});  
              }
           }
         )
         .catch(
             
             err => {
                console.error(err);
                 res.send({title: 'Trade history',trades:[],error:err,currencyPairs:[] });
             })
          
 });    

 // orders
 router.post('/api/returnOpenOrders/', function(req, res, next) {
  var param=req.body;
   trader.returnOpenOrders(param)
  .then(response => {
    
    var ordersJson=JSON.parse(response.body);
    var currencyPairs=_.keys(ordersJson); 

     if (ordersJson.error)           
      res.send({title: 'Your Open Orders',error:ordersJson.error ,currencyPairs:[],openOders:[]});              
     else 
        res.send({title: 'Your Open Orders',error:null ,currencyPairs:currencyPairs,openOders:ordersJson});     
  }
)
.catch(
    
    err => {
       console.error(err);
        res.send({title: 'Your Open Orders',openOders:[],error:err,currencyPairs:[] });
    })
 
});    

// buy
router.post('/api/buy/', function(req, res, next) {
  var param=req.body;
   trader.buy(param)
  .then(response => {
    
    var orderJson=JSON.parse(response.body);
     if (ordersJson.error)           
      res.send({title: 'Your order details',error:orderJson.error });              
     else 
        res.send({title: 'Your order details',error:null,order:orderJson});     
  }
)
.catch(
    
    err => {
       console.error(err);
        res.send({title: 'Your Open Orders',openOders:[],error:err,currencyPairs:[] });
    })
 
});    


//sell



router.post('/api/sell/', function(req, res, next) {
  var param=req.body;
   trader.sell(param)
  .then(response => {
    
    var orderJson=JSON.parse(response.body);
     if (ordersJson.error)           
      res.send({title: 'Your order details',error:orderJson.error });              
     else 
        res.send({title: 'Your order details',error:null,order:orderJson});     
  }
)
.catch(
    
    err => {
       console.error(err);
        res.send({title: 'Your Open Orders',openOders:[],error:err,currencyPairs:[] });
    })
 
});    

          
    }
        
    }(module.exports))
    
    
     
    
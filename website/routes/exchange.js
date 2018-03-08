(function(exchnage){

    var service = require("./../../service/currentPrice");
    var factory = require("../../exchanges/factory");
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
        
        factory.createExchange(param.exchnage || 'polo')
          .returnTradeHistory(param)
           .then(response => {
             var tradesJson=JSON.parse(response.body);
             var currencyPairs=_.keys(tradesJson); 
              if (!tradesJson.error)           
                res.send({title: 'Trade history',error:null ,exchange:param.exchnage,currencyPairs:currencyPairs,trades:tradesJson});
              else {
                res.send({title: 'Trade history',error:tradesJson.error,exchange:param.exchnage, currencyPairs:currencyPairs,trades:[]});  
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
  factory.createExchange(param.exchnage || 'polo')
   .returnOpenOrders(param)
  .then(response => {
    
    var ordersJson=JSON.parse(response.body);
    var currencyPairs=_.keys(ordersJson); 

     if (ordersJson.error)           
      res.send({title: 'Your Open Orders',error:ordersJson.error ,
      exchange:param.exchnage,
      currencyPairs:[],openOders:[]});              
     else 
        res.send({title: 'Your Open Orders',error:null ,
        exchange:param.exchnage,
        currencyPairs:currencyPairs,openOders:ordersJson});     
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

      factory.createExchange(param.exchnage || 'polo')
      .buy(param)
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
  console.log('placing sell order');
  console.log(param);
  factory.createExchange(param.exchnage || 'polo')
    .sell(param)
    .then(response => {
      console.log('order placed');
        var orderJson=JSON.parse(response.body);
        console.log(orderJson);
        if (orderJson.error)           
          res.send({title: 'Error',error:orderJson.error });              
        else 
          res.send({title: 'Your order details',error:null,order:orderJson});     
  }
)
.catch(
    
    err => {
      console.log('error occued while placing order');
      console.log(err);
       //console.error(err);
        res.send({title: 'Your Open Orders',openOders:[],error:err,currencyPairs:[] });
    })
 
});    

          
    }
        
    }(module.exports))
    
    
     
    
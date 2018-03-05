(function(exchnage){

    var service = require("./../../service/currentPrice");
    var trader = require("./../../service/trader");
    var _=require("underscore");

    var moment=require('moment');
    
    exchnage.init= function(router){
        
        /* GET home page. */

       router.get('/trade/', function(req, res, next) {
           /*
           let filter={
            currencyPair: 'all',
            start: new Date('2017-01-01 00:00:00').getTime() / 1000,
            end: new Date('2018-02-28 05:43:30').getTime() / 1000
          }
        trader.returnTradeHistory(filter)
              .then(response => {
                var tradesJson=JSON.parse(response.body);
                var currencyPairs=_.keys(tradesJson); 
               // console.log(currencyPairs);
                res.render('trades', {title: 'Trade Manager',error:null ,currencyPairs:currencyPairs,trades:tradesJson});
              }
            )
            .catch(
                
                err => {
                        console.error(err);
                    res.render('trades', {title: 'Trade Manager',trades:[],error:err,currencyPairs:[] });
                })
             
                */
     
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
  if(param.history==0) param.history=60;
  param.start=new Date( moment().subtract(param.history || 3, 'months')).getTime() / 1000;
  param.end=new Date(Date.now).getTime() / 1000
  param.currencyPairs='all'

  trader.returnOpenOrders(param)
     .then(response => {
       var ordersJson=JSON.parse(response.body);
       
        if (!ordersJson.error)           
          res.send({title: 'Open Orders',error:null ,orders:ordersJson});
        else {
          res.send({title: 'Open Orders',error:ordersJson.error ,orders:[]});  
        }
     }
   )
   .catch(
       
       err => {
          console.error(err);
           res.send({title: 'Open Orders',trades:[],error:err });
       })
    




});    
    
          
    }
        
    }(module.exports))
    
    
     
    
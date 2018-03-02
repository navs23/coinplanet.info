(function(exchnage){

    var service = require("./../../service/currentPrice");
    var trader = require("./../../service/trader");
    var _=require("underscore");


    
    exchnage.init= function(router){
        
        /* GET home page. */

       router.get('/trade/', function(req, res, next) {
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
             

     
       
      
    });    
    router.post('/api/trade/', function(req, res, next) {
    //     let filter={
    //      currencyPair: 'all',
    //      start: new Date('2017-01-01 00:00:00').getTime() / 1000,
    //       end: new Date('2018-02-28 05:43:30').getTime() / 1000
    //    }

     trader.returnTradeHistory(filter)
           .then(response => {
             var tradesJson=JSON.parse(response.body);
             var currencyPairs=_.keys(tradesJson); 
            // console.log(currencyPairs);
             res.send({title: 'Trade history',error:null ,currencyPairs:currencyPairs,trades:tradesJson});
           }
         )
         .catch(
             
             err => {
                console.error(err);
                 res.send({title: 'Trade history',trades:[],error:err,currencyPairs:[] });
             })
          

  
    
   
 });    
    
          
    }
        
    }(module.exports))
    
    
     
    
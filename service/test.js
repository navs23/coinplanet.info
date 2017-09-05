var service = require("./currentPrice");

service.getGlobalData().then(function(data){
    
    console.log(data);
})
.catch(function(err){
    console.log(err);
})

/*
service.getFiatExchangeRates().then(function(data){
       console.log(data);
    _.mapObject(data.rates,function(val,key){
        
        console.log("%s->%s",val,key);
    });
     
     
     //console.log(_.findWhere(data,{short:'BTC'}));
  })
  .catch(function(err){
    
     console.log(err);
  });
  */
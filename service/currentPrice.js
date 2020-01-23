
(function(price){
    
var http=require("http");
var https=require("https");
var helper =require("./helper");

// get current price
price.getCryptoExchangeRates=function(){
    return new Promise((resolve,reject)=>{
       
          var url ='https://api.coinmarketcap.com/v1/ticker/?limit=0';
          https.get(url,function(res){
             
       
           helper.getData({contentType:'json',res:res}).then(function(data){
               
               resolve(data);
               
               
           })
           .catch(function(err){
               reject(err);
              
           });
        
            }).on('error', (e) => {
            reject(e);
            
        });
          
    });
    
    
}

price.getFiatExchangeRates=function(){
    
      return new Promise((resolve,reject)=>{
         
          //var url ='https://api.fixer.io/latest?base=USD';
         var url ='http://data.fixer.io/api/latest?access_key=1b932a8e363d1b6a5d1a51a7a778d581';
          http.get(url,function(res){
           
           helper.getData({contentType:'json',res:res}).then(function(data){
             //console.log(data);                 
               resolve(data);
                                             
           })
           .catch(function(err){
               reject(err);
              
           });
           
            }).on('error', (e) => {
            reject(e);
            
        });
          
    });
    
    
}

price.getGlobalData=function(){
    
      return new Promise((resolve,reject)=>{
         
          var url ='https://api.coinmarketcap.com/v1/global/';
          https.get(url,function(res){
           
           helper.getData({contentType:'json',res:res}).then(function(data){
               
             console.log(data);
               resolve(data);
               
               
               
           })
           .catch(function(err){
               reject(err);
              
           });
           
            }).on('error', (e) => {
            reject(e);
            
        });
          
    });
    
    
}


//http://api.fixer.io/latest?base=USD
    
}(module.exports))





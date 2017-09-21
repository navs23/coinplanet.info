
(function(price){
    
var http=require("http");
var https=require("https");
var helper =require("./helper");

// get current price
price.getCryptoExchangeRates=function(){
    return new Promise((resolve,reject)=>{
       
          var url ='https://api.coinmarketcap.com/v1/ticker/';
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
         
          var url ='https://api.fixer.io/latest?base=USD';
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





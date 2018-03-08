(function(factory){
    factory.createExchange=function(type,config){
        if(type==="polo" || type==="poloniex"){

            return require('./poloniex');
        }



    }
 
    
}(module.exports))


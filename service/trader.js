(function(exchange){
    const TradingApi = require('poloniex-api').tradingApi;

    const APIKEY = 'YHSE1T8Q-Z55W3H0B-CO3INAPG-L84IKK89';
    const SECRET = '9dfc9c57a101f77ea1ca96487b78d804c656bb8c2a0e50c3fbcfea53ee4dc8b3fa4fbf09a48cb933a724cceeb88ce156da0f17e8ad179aaade071a0b3687b1a6';
    //const tradingApi = TradingApi.create(APIKEY, SECRET);
    

    exchange.returnTradeHistory=function(config){
        return TradingApi.create(config.key, config.secret).returnTradeHistory(config)
//        return tradingApi.returnTradeHistory(config);
    }
    
    exchange.buy=function(param){
        //{ currencyPair, amount, rate, fillOrKill, immediateOrCancel, postOnly }
         return TradingApi.create(param.key, param.secret).buy(param);
    }
    exchange.sell=function(param){
        //{ currencyPair, amount, rate, fillOrKill, immediateOrCancel, postOnly }
         return TradingApi.create(param.key, param.secret).sell(param)
    }
    exchange.returnOpenOrders=function(param){
        //{ currencyPair }
        console.log(param);
         return TradingApi.create(param.key, param.secret).returnOpenOrders(param)
    }
    
    
}(module.exports))


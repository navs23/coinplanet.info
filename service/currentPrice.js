
(function(price){
    
var http=require("http");
var https=require("https");
var helper =require("./helper");

// get current price
price.getCryptoExchangeRates=function(url){
    return new Promise((resolve,reject)=>{
       
        
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

price.getFiatExchangeRates=function(url){
    
      return new Promise((resolve,reject)=>{
         
        //
        let rates ={"success":true,"timestamp":1579775166,"base":"EUR","date":"2020-01-23","rates":{"AED":4.072092,"AFN":86.20734,"ALL":121.979035,"AMD":529.71032,"ANG":1.855229,"AOA":546.807923,"ARS":66.496915,"AUD":1.614231,"AWG":1.995576,"AZN":1.885817,"BAM":1.955351,"BBD":2.233404,"BDT":93.903103,"BGN":1.956963,"BHD":0.417956,"BIF":2084.242152,"BMD":1.108654,"BND":1.494207,"BOB":7.659124,"BRL":4.637505,"BSD":1.107704,"BTC":0.000132,"BTN":78.828696,"BWP":11.916274,"BYN":2.343885,"BYR":21729.610475,"BZD":2.226406,"CAD":1.459598,"CDF":1868.081631,"CHF":1.074091,"CLF":0.031118,"CLP":858.656148,"CNY":7.68627,"COP":3693.479454,"CRC":623.576095,"CUC":1.108654,"CUP":29.37932,"CVE":110.238017,"CZK":25.165361,"DJF":197.030243,"DKK":7.472988,"DOP":59.051478,"DZD":132.600537,"EGP":17.493334,"ERN":16.629708,"ETB":35.203447,"EUR":1,"FJD":2.407053,"FKP":0.843531,"GBP":0.843669,"GEL":3.198427,"GGP":0.843531,"GHS":6.277363,"GIP":0.843531,"GMD":56.818297,"GNF":10562.523108,"GTQ":8.517515,"GYD":231.433345,"HKD":8.616844,"HNL":27.275831,"HRK":7.443609,"HTG":109.769145,"HUF":336.830863,"IDR":15133.73134,"ILS":3.83317,"IMP":0.843531,"INR":79.046448,"IQD":1322.276288,"IRR":46679.859568,"ISK":137.795391,"JEP":0.843531,"JMD":152.483295,"JOD":0.786478,"JPY":121.443576,"KES":111.754977,"KGS":77.318284,"KHR":4488.320224,"KMF":492.907531,"KPW":997.836498,"KRW":1292.790306,"KWD":0.336721,"KYD":0.923074,"KZT":418.037661,"LAK":9832.892405,"LBP":1673.603497,"LKR":201.030981,"LRD":215.078718,"LSL":15.9095,"LTL":3.273566,"LVL":0.670614,"LYD":1.547226,"MAD":10.649092,"MDL":19.577407,"MGA":4089.811919,"MKD":61.614366,"MMK":1627.048159,"MNT":3044.28758,"MOP":8.86583,"MRO":395.789189,"MUR":40.575159,"MVR":17.182781,"MWK":814.639213,"MXN":20.748229,"MYR":4.511664,"MZN":69.82322,"NAD":15.908873,"NGN":401.332497,"NIO":37.364179,"NOK":9.964456,"NPR":126.123848,"NZD":1.681334,"OMR":0.426833,"PAB":1.107629,"PEN":3.673901,"PGK":3.776907,"PHP":56.496978,"PKR":171.173843,"PLN":4.246088,"PYG":7227.019664,"QAR":4.036579,"RON":4.778854,"RSD":117.500612,"RUB":68.671774,"RWF":1051.433101,"SAR":4.153678,"SBD":9.187722,"SCR":15.188762,"SDG":50.249712,"SEK":10.537065,"SGD":1.495794,"SHP":0.843531,"SLL":10767.783496,"SOS":643.019627,"SRD":8.26832,"STD":23903.447358,"SVC":9.691627,"SYP":570.955294,"SZL":15.998738,"THB":33.825139,"TJS":10.738271,"TMT":3.891374,"TND":3.129756,"TOP":2.552234,"TRY":6.566749,"TTD":7.489366,"TWD":33.303396,"TZS":2555.22362,"UAH":27.02404,"UGX":4070.503493,"USD":1.108654,"UYU":41.396866,"UZS":10593.166265,"VEF":11.072673,"VND":25690.275445,"VUV":129.381041,"WST":2.927917,"XAF":655.790542,"XAG":0.06263,"XAU":0.000713,"XCD":2.996191,"XDR":0.802696,"XOF":655.84082,"XPF":119.230819,"YER":277.551452,"ZAR":15.912893,"ZMK":9979.207494,"ZMW":16.172135,"ZWL":356.986459}}
        return resolve(rates);
        // end mock
        
          //var url ='https://api.fixer.io/latest?base=USD';
    
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

price.getGlobalData=function(url){
    
      return new Promise((resolve,reject)=>{
         
         
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





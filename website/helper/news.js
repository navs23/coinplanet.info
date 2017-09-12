//
var https=require("https");
var cheerio = require('cheerio');

(function(news){

    news.getCryptocoinsNews=function(param){
         param.newsItems=param.newsItems || [];
        return new Promise((resolve,reject)=>{
        var data;
        var selector = param.selector;
        var url =param.url;
        var newslink;
        var img;
        https.get(url,function(res){
                 res.on('data', (chunk) => { data += chunk; });
  
                res.on('end', () => {
                  
                      var $ = cheerio.load(data);
    
                        $(selector).each(function(i,item){
                           
                            newslink = ($(this).closest('a').attr('href') || $(this).find('a').attr('href'));
                            
                            param.newsItems.push( 
                                {
                                    
                                    item:$(this).text(),
                                    newsLink:newslink
                                  
                                });
                            
                            
                        });
                    
                         resolve(param.newsItems);
                      
                     });     
            }).on('error', (e) => {
            reject(e);
            
            });
        
      
           
       
        });
        
    
    }
  
}(module.exports))

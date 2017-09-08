//
var https=require("https");
var cheerio = require('cheerio');

(function(news){

    news.getCryptocoinsNews=function(){
        var newsItems=[];
        return new Promise((resolve,reject)=>{
         var data;
          var url ='https://cryptocoinsnews.com/widget/bitcoin_widget.js.php';
          https.get(url,function(res){
                
                 res.on('data', (chunk) => { data += chunk; });
  
                res.on('end', () => {
                    
                      var $ = cheerio.load(data);
    
                        $('li>a').each(function(i,item){
                            
                            newsItems.push( 
                                {
                                    item:$(this).text(),
                                    newsLink:$(this).attr('href')
                                    
                                });
                            
                            
                        });
                    
                        resolve(newsItems);
                      
                     });     
            }).on('error', (e) => {
            reject(e);
            
        });
      
  
        });
    }
  
}(module.exports))

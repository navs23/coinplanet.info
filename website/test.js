var news = require("./helper/news.js");

/*
news.getCryptocoinsNews().then(function(html){
   
    console.log(html);
    
})
.catch(function(e){
    
   console.log(e);
});
*/
//
var https=require("https");
var cheerio = require('cheerio');

(function(){
    var items=[];
   
     var data;
      var url ='https://bitcoin.org/en/resources';
      https.get(url,function(res){
            
             res.on('data', (chunk) => { data += chunk; });
    
            res.on('end', () => {
                
                  var $ = cheerio.load(data);
    
                    $('.resources a').each(function(i,item){
                       var i= {
                                item:$(this).text(),
                                link:$(this).attr('href')
                               
                            }
                             console.log('%s,',JSON.stringify(i))
                        items.push( i                );
                        
                        
                    });
                
                   
                  
                 });     
        }).on('error', (e) => {
       
        
    });
    
    
  
    }())
  


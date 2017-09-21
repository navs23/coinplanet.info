//
var https=require("https");
var cheerio = require('cheerio');
var async=require('async');

(function(news){

    news.scrap=function(param){
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
    news.getNews=function(cb){
        
    var urls=[
		function(cb){
			var item={url:'https://cryptocoinsnews.com/widget/bitcoin_widget.js.php',selector:'li>a'}
			 news.scrap(item).then(function(newsItems){ 
		 	cb(null,newsItems);
		 });
		}
		,
		function(cb){
			var item={url:'https://cryptoinsider.com/category/news/',selector:'div.post-content > h2 > a'}
			 news.scrap(item).then(function(newsItems){ 
		 	cb(null,newsItems);
		 });
		},
		function(cb){
			var item={url:'https://cointelegraph.com/tags/bitcoin',selector:'#recent >  a'}
			 news.scrap(item).then(function(newsItems){ 
		 	cb(null,newsItems);
		 });
		}
		//url:'https://www.coindesk.com/',selector:'div.post-info > h3'}
	,
		function(cb){
			var item={url:'https://www.coindesk.com/',selector:'div.post-info > h3'}
			 news.scrap(item).then(function(newsItems){ 
		 	cb(null,newsItems);
		 });
		}
	];
	async.series(urls,function(err,data){
	
	var news=[];
	for(var i =0;i<data.length;i++)
	{
	//	console.log(data[i]);
		for(var k =0;k<data[i].length;k++)
		{
			//console.log(data[i][k].item);
			news.push(data[i][k]);
			
		}
		
	}
	cb(null,news);
	});
    }
  
}(module.exports))

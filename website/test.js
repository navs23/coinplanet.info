var news = require("./helper/news.js");
var async= require('async');
    function testNews(){
	 var param = {url:'https://cryptocoinsnews.com/widget/bitcoin_widget.js.php',selector:'li>a'}
	 
	 news.getCryptocoinsNews(param).then(function(newsItems){
	
		param={url:'https://cryptoinsider.com/category/news/',selector:'div.post-content > h2 > a',newsItems:newsItems}
		news.getCryptocoinsNews(param).then(function(newsItems){
			param={url:'https://cointelegraph.com/tags/bitcoin',selector:'#recent >  a',newsItems:newsItems}
			
				news.getCryptocoinsNews(param).then(function(newsItems){
					
					param = {url:'https://www.coindesk.com/',selector:'div.post-info > h3'}
	  
					news.getCryptocoinsNews(param).then(function(newsItems){
						console.log(param.newsItems);
	   
	    
					}).catch(function(e){
	    
	   	
					});
					
				})
				.catch(function(err){
					
				});
				
			
				
		}).catch(function(err){	console.log(err);});
		
	   
	   
	    
	})
	.catch(function(err){
	    
	   	console.log(err);
	});
	    	
    }
/*
 async.eachLimit(parameterArray, 5, function(param, eachCb) {
        var url = 'https://api.example.org?parameter=' + param;
        rest.get(url).on('complete', function(data){
            var processedData;
            // after some processing on data
            returnArray.push(processedData);
            eachCb(null);
        });
    }, function(err) {
        // done with all ajax calls
        res.json(returnArray);
    });    	
  


*/

(function(){
	
	var urls=[
		function(cb){
			var item={url:'https://cryptocoinsnews.com/widget/bitcoin_widget.js.php',selector:'li>a'}
			 news.getCryptocoinsNews(item).then(function(newsItems){ 
		 	cb(null,newsItems);
		 });
		}
		,
		function(cb){
			var item={url:'https://cryptoinsider.com/category/news/',selector:'div.post-content > h2 > a'}
			 news.getCryptocoinsNews(item).then(function(newsItems){ 
		 	cb(null,newsItems);
		 });
		},
		function(cb){
			var item={url:'https://cointelegraph.com/tags/bitcoin',selector:'#recent >  a'}
			 news.getCryptocoinsNews(item).then(function(newsItems){ 
		 	cb(null,newsItems);
		 });
		}
		//url:'https://www.coindesk.com/',selector:'div.post-info > h3'}
	,
		function(cb){
			var item={url:'https://www.coindesk.com/',selector:'div.post-info > h3'}
			 news.getCryptocoinsNews(item).then(function(newsItems){ 
		 	cb(null,newsItems);
		 });
		}
	];

	
	async.series(urls,function(err,data){
	
	//console.log(data);
	for(var i =0;i<data.length;i++)
	{
	//	console.log(data[i]);
			for(var k =0;k<data[i].length;k++)
		{
			console.log(data[i][k].item);
			
		}
		
	}
	
	});
	
}())
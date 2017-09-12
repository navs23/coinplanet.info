var news = require("./helper/news.js");
 var param = {url:'https://www.coindesk.com/',selector:'div.post-info > h3'}
	  
	 news.getCryptocoinsNews(param).then(function(newsItems){
		console.log(newsItems);
	   
	    
	})
	.catch(function(e){
	    
	   	
	});
	    	


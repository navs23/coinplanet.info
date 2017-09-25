var news = require("./helper/news.js");
var async= require('async');


(function(){
	
	var urls=[
		function(cb){
			var item={url:'https://coinmarketcap.com/currencies/bitcoin/#markets',selector:'#markets-table > tbody > tr > td:nth-child(3) > a'}
			 news.scrap(item).then(function(newsItems){ 
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
			console.log(data[i][k].newsLink);
			
		}
		
	}
	
	});
	
}())
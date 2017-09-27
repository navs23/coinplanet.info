var news = require("./helper/news.js");
var async= require('async');


	var data;
    	var searchstr = req.params.symbol ;
    	 data = _.filter(req.app.cache.priceData,function(item){
    	 	
    		return (item.symbol.toString().toLowerCase()==searchstr.toString().toLowerCase());	
    	 	
    	 });
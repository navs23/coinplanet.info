(function(home){

var service = require("./../../service/currentPrice");
var data = require("./../../service/data");
var _=require("underscore");
var news = require("./../helper/news.js");

home.init= function(router){
	
	/* GET home page. */
	router.get('/', function(req, res, next) {
  /*
  console.log("page index is %s ",req.params.pageIndex);
  var temp= getPaginatedItems(req.app.cache.priceData,req.params.pageIndex || 1);
  
  console.log(temp);
  */
   res.render('index', {title: '' });
   
  
});    
    	
    router.get('/chat/', function(req, res, next) {
        res.render('chat', {title: 'Live chat' });
   
  
});   

	router.get('/resources/', function(req, res, next) {
	 
	res.render('resources', {title: 'Resources',resources:data.getData("resources")});
	   
	  
	});   

	router.get('/api/cryptopricefeed/:searchstr?/:pageIndex?', function(req, res, next) {
    
    	var data;
    	var searchstr = req.params.searchstr || 'all';
    	
    	if (searchstr !='all')
    	{
    	 data = _.filter(req.app.cache.priceData,function(item){
    	 	
    		return item.symbol.toString().toLowerCase().indexOf(searchstr.toLowerCase())>=0;	
    	 	
    	 });
    	}
    	else
    		data = req.app.cache.priceData;
    	
		 var temp= getPaginatedItems(data,req.params.pageIndex || 1);
		
    	
    	res.send(temp);
    	
  
});

	router.get('/api/getTop20ByVolume?/:pageIndex?/:pageIndex?', function(req, res, next) {
    
    	var data;
    	
    	 data = _.filter(req.app.cache.priceData,function(item){
    	 	console.log(item.rank);
    		return item.rank<=20;
    	 	
    	 });
    	
		 var temp= getPaginatedItems(data,req.params.pageIndex || 1);
		
    	
    	res.send(temp);
    	
  
});

	router.get('/api/fiatpricefeed/', function(req, res, next) {
    
	
		var data = req.app.cache.fiatPriceData || [];
		
		//console.log(data);
    	//var temp= getPaginatedItems(data.rates,req.params.pageIndex || 1);
    	res.send(data);
    	
  
}); 
	router.get('/api/getmostpopular/', function(req, res, next) {
    
	//"USD","AUD",CAD","CHF","CNY","GBP","INR"
	
    		var data;
    	
    	 data = _.filter(req.app.cache.fiatPriceData,function(item){
    	 	console.log(item.rank);
    		//return item.rank<=20;
    	 	
    	 });
    	
	
		
    	
    	res.send(data);
    	
  
}); 

	router.get('/api/getCryptoGloabl/', function(req, res, next) {
    
	
		var temp = req.app.cache.cryptoGlobal || [];
    	
    	res.send(temp);
    	
  
}); 

	router.get('/api/news/', function(req, res, next) {
   
    	
    		
    			res.send(req.app.cache.news || []);
    
  
	}); 
	
	router.get('/gettingstarted/', function(req, res, next) {
	 
	res.render('getting-started', {title: 'Getting started with bitcoin'});
	   
	  
	});  

	function getPaginatedItems(items, page) {
	var page = page || 1,
	    per_page = 500,
	    offset = (page - 1) * per_page,
	    paginatedItems = _.rest(items, offset).slice(0, per_page);
	    
	    
	return {
		page: page,
		per_page: per_page,
		total: items.length,
		total_pages: Math.ceil(items.length / per_page),
		data: paginatedItems
	};
}

    
}


    
}(module.exports))


 

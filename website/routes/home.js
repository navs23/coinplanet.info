(function(home){

var service = require("./../../service/currentPrice");
const newsService =require("./../../service/news");
var data = require("./../../service/data");
var _=require("underscore");
//var news = require("./../helper/news.js");
var blockexplorer = require('blockchain.info/blockexplorer')
var path = require('path')
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

  router.get('/logs/', function(req, res, next) {
        res.send(path.join(__dirname, 'access.log'));
   
});   
  //path.join(__dirname, 'access.log')

	router.get('/resources/', function(req, res, next) {
	 
	res.render('resources', {title: 'Resources',resources:data.getData("resources")});
	   
	  
	});
	
	router.get('/glossary/', function(req, res, next) {
	 
	res.render('glossary', {title: 'Bitcoin Glossary',"data":data.getGlossaryItems()});
	   
	  
	});   
/*
	router.get('/api/news/', function(req, res, next) {
   
    	//'https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=89a7e14a30bf4eff8031538728c027ac'
    	news.getNews(function(err,articles){
			if(err) return res.send(err)
			return 	res.send(articles);

		})	
    	 
    
  
	}); 
	*/
	router.get('/gettingstarted/', function(req, res, next) {
	 
	res.render('getting-started', {title: 'Getting started with bitcoin'});
	   
	});  

	router.get('/valuation/', function(req, res, next) {
	 
	res.render('valuation', {title: 'realtime valution of your digital assets coins'});
	   
	  
	});  
	
	// router.get('/socket/', function(req, res, next) {
	 
	// res.render('socket', {title: 'socket'});
	   
	  
	// });  
	
	router.get('/api/search/crypto/:symbol', function(req, res, next) {
    
    	var data ;
    	var searchstr = req.params.symbol ;
    	console.log(req.app.cache.priceData);
    	 data = _.filter(req.app.cache.priceData,function(item){
    	 	//console.log('%s, %s',item.symbol.toString().toLowerCase(),searchstr.toString().toLowerCase());
    		return (item.symbol.toString().toLowerCase()==searchstr.toString().toLowerCase());	
    	 	
    	 });
    
		 var temp= getPaginatedItems(data,1);
		
    	
    	res.send(temp);
    	
  
});	

	router.get('/api/blockexplorer/:address',function(req,res){
		var address= req.params.address;
		var promise = blockexplorer.getBalance(address,null);
		
		promise.then(function(data){
			res.setHeader('Content-Type', 'application/json');
		
			res.send(data);
		});
		promise.catch(function(err){
			var obj={};
			obj.err=err;
		res.send(obj);	
		});
		
		
		
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


 

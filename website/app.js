const events = require('events');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cache={};
var index = require('./routes/index');
var users = require('./routes/users');
var service = require("../service/currentPrice");
var _=require("underscore");
var poller = require('./helper/poller.js');
var news = require('./helper/news.js');
var app = express();

//var eventEmitter = new events.EventEmitter();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("cache",cache);


  service.getCryptoExchangeRates().then(function(data){
        
     app.cache.priceData= data;
     
   
  })
  .catch(function(err){
    console.log(err);
      app.cache.priceData= [];
  });
  
  
   service.getGlobalData().then(function(data){
     
     console.log('getting gloabl data')  ;
     app.cache.cryptoGlobal= data;
     
     
  })
  .catch(function(err){
    
      app.cache.cryptoGlobal= [];
  });
  
  service.getFiatExchangeRates().then(function(data){
       
     app.cache.fiatPriceData= data;
     
    
  })
  .catch(function(err){
    
      app.cache.fiatPriceData= [];
  });
  
 

  poller.poll({fn:function(){
    
      service.getCryptoExchangeRates().then(function(data){
          
       app.cache.priceData= data;
       
    })
    .catch(function(err){
      console.log(err);
        app.cache.priceData= [];
    });
    
    
    	news.getNews(function(err,result){
    		if(!err)
    			app.cache.news= result;
    		else
    		app.cache.news= [];
    	});
   console.log('event raised');
   app.emit('cache-refreshed',{}); 
  }
    ,interval:(30 * 1000)
    
  });
  
  poller.poll({fn:function(){
    
       service.getFiatExchangeRates().then(function(data){
         
       app.cache.fiatPriceData= data;
       
       //console.log(_.findWhere(data,{short:'BTC'}));
    })
    .catch(function(err){
        console.log('error getting fiat price %s',err);
        app.cache.fiatPriceData= [];
    });
    
  }
    ,interval:(60 * 60 * 1000)
    
  });
  
  poller.poll({fn:function(){
    
      service.getGlobalData().then(function(data){
       
       console.log('getting gloabl data')  ;
       app.cache.cryptoGlobal= data;
       
       
    })
    .catch(function(err){
      
        app.cache.cryptoGlobal= [];
    });
    
    
  }
    ,interval:(30 * 1000)
    
  });



index.init(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

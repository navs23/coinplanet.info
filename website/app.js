const events = require('events');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var cache={};
var index = require('./routes/index');
var users = require('./routes/users');
var service = require("../service/currentPrice");
var _=require("underscore");
//var poller = require('./helper/poller.js');
var news = require('./helper/news.js');
let ips  =[];
const logger = (req,res,next)=>{
   let {ip} = req;
   // console.log("ip address is %s",ip);
  if (ips.some(add=>add == ip) == false){
    ips.push(ip);
  }
  
  console.log(ips);
  next();
}

var app = express();
app.get('/_api/ip',(req,res)=>{
  res.json(ips);
})
//var eventEmitter = new events.EventEmitter();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('trust proxy', true)
//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("cache",cache);
console.log("setting up logger")
app.use(logger);


console.log("logger set up complete")

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com','https://navs23-coinplanet-info.glitch.me','http://data.fixer.io'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}


 

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

/*
var news = require("./helper/news.js");
var async= require('async');

	var item={url:'https://www.coindesk.com/',selector:'div.post-info  h3 a'}
			 news.scrap(item).then(function(newsItems){ 
		 	console.log(newsItems);
		 }).catch(function(err){
		     console.log(err);
		 })
		 */
var base64 = require('base-64');
var utf8 = require('utf8');
 
var text = 'https://www.cryptocoinsnews.com/bitcoin-continues-to-gain-use-for-retail-purchases/z';
var bytes = utf8.encode(text);
var encoded = base64.encode(bytes);
console.log(encoded);
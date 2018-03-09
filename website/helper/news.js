//



(function(news){
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('89a7e14a30bf4eff8031538728c027ac');
  news.getNews=function(cb){

	newsapi.v2.everything({
		q: 'bitcoin',
		//sources: 'bbc-news,the-verge',
		//domains: 'bbc.co.uk, techcrunch.com',
		//from: '2017-12-01',
		//to: '2017-12-12',
		language: 'en',
		sortBy: 'publishedAt',
		page: 5
	  }).then(response => {
		console.log(response);
		return cb(null,response.articles);
	  })
	 .catch(function(err){
		 console.log('error');
		return cb(err,[]);
	 });
  }
  
}(module.exports))


(function(news){

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

  news.getNews=function(filter){

	return newsapi.v2.everything({
		q: 'bitcoin',
		//sources: 'bbc-news,the-verge',
		//domains: 'bbc.co.uk, techcrunch.com',
		//from: '2017-12-01',
		//to: '2017-12-12',
		language: 'en',
		sortBy: 'publishedAt',
		page: 5
	  });
    
  }
  
}(module.exports))

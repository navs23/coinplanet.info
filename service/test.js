var news = require('../website/helper/news')
news.getNews(function(err,data){

    console.log(err);
    console.log(data);
})

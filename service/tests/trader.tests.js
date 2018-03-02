var trader=require('../trader')
var _=require("underscore");
var moment=require('moment');

trader.returnTradeHistory(
{
    currencyPair: 'all',
    start: new Date( moment().subtract(3, 'months')).getTime() / 1000,
     end: new Date(Date.now).getTime() / 1000
  }
)
  .then(msg => console.log(
      
    msg.body)
)
.catch(err => console.log(err));

 


  
  
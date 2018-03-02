var trader=require('../trader')
var _=require("underscore");
var moment=require('moment');
const APIKEY = 'YHSE1T8Q-Z55W3H0B-CO3INAPG-L84IKK89';
const SECRET = '9dfc9c57a101f77ea1ca96487b78d804c656bb8c2a0e50c3fbcfea53ee4dc8b3fa4fbf09a48cb933a724cceeb88ce156da0f17e8ad179aaade071a0b3687b1a6';
trader.returnTradeHistory(
{
    currencyPair: 'all',
    start: 1517582570.092,//new Date( moment().subtract(3, 'months')).getTime() / 1000,
     end: 1520001770.093,//new Date(Date.now).getTime() / 1000,
    key:APIKEY,
    secret:SECRET
  }
)
  .then(msg => console.log(
      
    msg.body)
)
.catch(err => console.log(err));

 


  
  
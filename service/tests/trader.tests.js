var trader=require('../trader')
var _=require("underscore");
var moment=require('moment');
const APIKEY = '46KAED0L-DF7PIY1S-9AUFACRN-NW0CTGRN';
const SECRET = '04e8c46be06da869df8d2d72897136894e0d0503dd8de8572f8845f20fee4e927e54fb8305ac9d8e57e159fe9cca8af747f34655834a195630cf9f6cb1671882';
trader.returnOpenOrders(
{
    currencyPair: 'all',
    //start: 1517582570.092,//new Date( moment().subtract(3, 'months')).getTime() / 1000,
    //end: 1520001770.093,//new Date(Date.now).getTime() / 1000,
    key:APIKEY,
    secret:SECRET
  }
)
  .then(msg => console.log(
      
    msg.body)
)
.catch(err => console.log(err));

 


  
  
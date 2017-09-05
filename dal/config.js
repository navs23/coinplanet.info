var config= [
    {   
        name:"save_price_feed",
        query:"insert into price_feed (position ,symbol ,name ,time ,usdPrice ,btcPrice ,usdVolume ,mktcap usdPrice,supply ,change24 ) values (%d,'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')"
        
        
 }
    ,{   
        name:"get_price_feed",
        query:"select position ,symbol ,name ,time ,usdPrice ,btcPrice ,usdVolume ,mktcap usdPrice,supply ,change24 from price_feed"
 }
];

module.exports=config;
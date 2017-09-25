(function(data){
var resourcesJson=
    {"education":[
    {"item":"Bitcoin Wiki","link":"https://en.bitcoin.it/"},
    {"item":"Let's Talk Bitcoin","link":"http://letstalkbitcoin.com/"},
    {"item":"Bitcoin Knowledge Podcast","link":"http://www.bitcoin.kn/"},
    {"item":"IamSatoshi","link":"http://www.iamsatoshi.com/category/video-archive/"},
    {"item":"BitcoinMining.com","link":"https://www.bitcoinmining.com/"},
    {"item":"Khan Academy","link":"https://www.khanacademy.org/economics-finance-domain/core-finance/money-and-banking/bitcoin/v/bitcoin-what-is-it"},
]
,"exchanges":[
{item:"bitfinex",link:"https://www.bitfinex.com/"},
{item:"kraken",link:"https://www.kraken.com"},
{item:"gdax",link:"https://www.gdax.com/"},
{item:"bittrex",link:"https://bittrex.com/"},
{item:"poloniex",link:"https://poloniex.com/exchange/"},
{item:"bitstamp",link:"https://www.bitstamp.net/"},
{item:"bithumb",link:"https://www.bithumb.com/"},
{item:"hitbtc",link:"https://hitbtc.com/"},

{item:"okcoin",link:"https://www.okcoin.cn/"},
{item:"dsx",link:"https://dsx.uk/"},
{item:"getbtc",link:"https://getbtc.org/"},
{item:"quoinex",link:"https://quoinex.com/"},
{item:"bitflyer",link:"https://bitflyer.jp/"}
]
,"business":[
    {"item":"WeUseCoins.com","link":"https://www.weusecoins.com/"},
    {"item":"Spendabit.co","link":"https://spendabit.co/"},
    {"item":"airbitz.co","link":"https://airbitz.co/"},
    {"item":"99bitcoins.com","link":"https://99bitcoins.com/who-accepts-bitcoins-payment-companies-stores-take-bitcoins/"},
    {"item":"https://www.buybitcoinworldwide.com","link":"https://www.buybitcoinworldwide.com/"},
    {"item":"Merchant tools","link":"https://en.bitcoin.it/wiki/Category:Shopping_Cart_Interfaces"},
    {"item":"Book flights","link":"http://www.btctrip.com"},
    ]
,"news":[
    {"item":"Prices and charts","link":"https://coinmarketcap.com/"},
    {"item":"Current price","link":"http://capfeed.com/"},
{"item":"coinmap.org","link":"https://coinmap.org/"},
{"item":"Projects","link":"http://www.bitcoinprojects.net/"},
{"item":"CoinTelegraph","link":"http://cointelegraph.com/"},
{"item":"CoinDesk","link":"http://www.coindesk.com"},
{"item":"Bitcoin Magazine","link":"https://bitcoinmagazine.com"},
{"item":"CoinJournal","link":"http://coinjournal.net"},
{"item":"BitcoinTalk press links","link":"https://bitcointalk.org/index.php?board=77.0"},
{"item":"Blockchain.info","link":"https://blockchain.info/charts/"}
    ]
,"others":[
    {"item":"Wallets","link":"/en/choose-your-wallet"},
    {"item":"Biteasy","link":"https://www.biteasy.com"},
{"item":"Trade Block","link":"https://tradeblock.com"},
{"item":"Bitcoincharts.com","link":"https://bitcoincharts.com/charts/"},
{"item":"GoBitcoin.io","link":"https://gobitcoin.io/en/"},
{"item":"BitcoinAverage","link":"https://bitcoinaverage.com/en/bitcoin-price/btc-to-usd"},
{"item":"Bitcoin Volatility Index","link":"https://bitvol.info/"},
{"item":"BitcoinFilm.org","link":"http://bitcoinfilm.org/"},
{"item":"Ulterior States","link":"http://iamsatoshi.com/"},
{"item":"The Bitcoin Phenomenon","link":"https://www.youtube.com/watch?v=6pWblf8COH4"},
{"item":"Bitrefill","link":"https://www.bitrefill.com/"},
{"item":"Fold","link":"https://foldapp.com/"},
{"item":"Gyft","link":"https://gyft.com/bitcoin/"},
{"item":"Opendime","link":"https://opendime.com/"}
    ]
    
};

data.getData=function(type){
    
    if(type==="resources")
    return resourcesJson;
    else
    return [];
}
	 		

    
}(module.exports))

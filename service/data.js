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
{"item":"Blockchain.info","link":"https://blockchain.info/charts/"},
{"item":"Crypto Coin News","link":"https://www.cryptocoinnews.com"},
{"item":"Bitcoin Wisdom","link":"https://www.bitcoinwisdom.com"},
{"item":"Coin Market Calendar","link":"https://www.coinmarketcal.com"}
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
{"item":"Opendime","link":"https://opendime.com/"},
{"item":"Coin Hills - Market data","link":"https://www.coinhills.com/"},
    ]

};

var glossaryJson=
{
"title":"This quick glossary contains many of the terms used in relation to bitcoin and other crypto currencies.",
"items":[
    {
        item:"bitcoin",
        description:"The name of the currency unit (the coin), the network, and the software."
    }
	,{
        item:"address",
        description:"A bitcoin address looks like 1DSrfJdB2AnWaFNgSbv3MZC2m74996JafV. It consists of a string of letters and numbers starting with a “1” (number one). Just like you ask others to send an email to your email address, you would ask others to send you bitcoin to your bitcoin address."
    }
	,{
        item:"bip",
        description:"Bitcoin Improvement Proposals. A set of proposals that members of the bitcoin community have submitted to improve bitcoin. For example, BIP0021 is a proposalto improve the bitcoin uniform resource identifier (URI) scheme."
    }
	
	,{
        item:"block",
        description:"A grouping of transactions, marked with a timestamp, and a fingerprint of the previous block. The block header is hashed to produce a proof of work, thereby validating the transactions. Valid blocks are added to the main blockchain by network consensus."
    }
	,{
        item:"blockchain",
        description:"A list of validated blocks, each linking to its predecessor all the way to the genesis block."
    }
	,{
        item:"confirmations",
        description:"Once a transaction is included in a block, it has one confirmation. As soon as another block is mined on the same blockchain, the transaction has two confirmations,and so on. Six or more confirmations is considered sufficient proof that a transaction cannot be reversed."
    }
	,{
        item:"difficulty",
        description:"A network-wide setting that controls how much computation is required to produce a proof of work."
    }
	,{
        item:"difficulty target",
        description:"A difficulty at which all the computation in the network will find blocks approximately every 10 minutes."
    }
	,{
        item:"difficulty retargeting",
        description:"A network-wide recalculation of the difficulty that occurs once every 2,106 blocks and considers the hashing power of the previous 2,106 blocks."
    }
	,{
        item:"fees",
        description:"The sender of a transaction often includes a fee to the network for processing the requested transaction. Most transactions require a minimum fee of 0.5 mBTC."
    }
	,{
        item:"hash",
        description:"A digital fingerprint of some binary input."
    }
	,{
        item:"genesis block",
        description:"The first block in the blockchain, used to initialize the cryptocurrency."
    }
	,{
        item:"miner",
        description:"A network node that finds valid proof of work for new blocks, by repeated hashing."
    }
	,{
        item:"network",
        description:"A peer-to-peer network that propagates transactions and blocks to every bitcoin node on the network."
    }
	,{
        item:"Proof-Of-Work",
        description:"A piece of data that requires significant computation to find. In bitcoin, miners must find a numeric solution to the SHA256 algorithm that meets a network-wide target, the difficulty target."
    }
	,{
        item:"reward",
        description:"An amount included in each new block as a reward by the network to the miner who found the Proof-Of-Work solution. It is currently 25BTC per block."
    }
	,{
        item:"reward",
        description:"An amount included in each new block as a reward by the network to the miner who found the Proof-Of-Work solution. It is currently 25BTC per block."
    }
	,{
        item:"secret/pricvate key",
        description:"The secret number that unlocks bitcoins sent to the corresponding address. A secret key looks like 5J76sF8L5jTtzE96r66Sf8cka9y44wdpJjMwCxR3tzLh3ibVPxh."
    }
	,{
        item:"transaction",
        description:"An amount included in each new block as a reward by the network to the miner who found the Proof-Of-Work solution. It is currently 25BTC per block."
    }
	,{
        item:"reward",
        description:"In simple terms, a transfer of bitcoins from one address to another. More precisely,a transaction is a signed data structure expressing a transfer of value. Transactions are transmitted over the bitcoin network, collected by miners, and included into blocks, made permanent on the blockchain."
    }
	,{
        item:"wallet",
        description:"Software that holds all your bitcoin addresses and secret keys. Use it to send, receive, and store your bitcoin."
    }
	

    ]

	
};


data.getData=function(type){
    
    if(type==="resources")
    return resourcesJson;
    else
    return [];
}



data.getGlossaryItems=function(){
    return glossaryJson;
  
}
	 		
}(module.exports))

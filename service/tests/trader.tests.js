var bittrex = require('node-bittrex-api');
//console.log(bittrex);
bittrex.options({
  'apikey' : '5312028aa0e54fc2bfae4c1a836f6aba',
  'apisecret' : 'e2adde5dd7d34c88a6e17238441214ab',
});

    

    
bittrex.getorderhistory(null, function( data, err ) {
  if (err) {
    return console.error(err);
  }
 console.log(data);
});

# cryptofetch

Fetch market data from cryptocurrency exchanges

[![Build Status](https://travis-ci.org/jsantell/cryptofetch.png)](https://travis-ci.org/jsantell/cryptofetch)

## Install

```
npm install cryptofetch
```

## Usage

Function takes three arguments: `exchange`, `currency` and `base`. Returns a promise
that resolves to an object with several properties related to the exchange and normalized
where possible. Current exchanges and data available are listed below.

```
var fetch = require('cryptofetch');

// Query the current data for LTC in terms of LTC/BTC on BTC-e
fetch('btc-e', 'ltc', 'btc').then(function (data) {
  console.log(data);
  /*
  {
    high: 0.03889,
    low: 0.0301,
    avg: 0.034495,
    vol: 22371.85528,
    last: 0.03626,
    buy: 0.03626,
    sell: 0.03611
  }
  */
});

```

## Current Exchanges

Currently supported exchanges and the data returned. More exchanges can be
added via `./lib/exchanges/`.

* `btc-e`: `high`, `low`, `avg`, `vol`, `last`, `buy`, `sell`
* `vircurex`: `high`, `low`, `last`
* `bter`: `high`, `low`, `avg`, `last`, `buy`, `sell`

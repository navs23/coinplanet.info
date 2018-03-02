'use strict';

const config = require('../config');
const common = require('../common');

module.exports = {
    RestfulClient: function (publicKey, secretKey) {
        this.publicKey = publicKey;
        this.secretKey = secretKey;

        /**
         * This is a generic function which is used by the other functions.
         * You can also use this function with a specific url as parameter and providing a function which will handle the response.
         * Example: to print the data from https://apiv2.bitcoinaverage.com/constants/symbols, you need to call:
         * restfulClient.getResource('constants/symbols', function(response) {
         *     console.log(response);
         * });
         * @param resourcePath - the resource's path, without the domain name
         * @param handleResponseCallback - callback function which handles the response
         * @returns {*}
         */
        this.getResource = function (resourcePath, handleResponseCallback) {
            var fullUrl = config.BETA_PREFIX + resourcePath;
            return common.getResourceForFullUrl(fullUrl, this.publicKey, this.secretKey, handleResponseCallback);
        };

        /**
         * Get all symbols (local and global) and process them with handleResponseCallback callback.
         * @param handleResponseCallback - callback function which handles the response
         */
        this.allSymbols = function (handleResponseCallback) {
            return this.getResource('constants/symbols', handleResponseCallback);
        };

        /**
         * Symbols for a specific market
         * @param market - global or local
         * @param handleResponseCallback
         * @returns {*}
         */
        this.symbolsPerMarket = function (market, handleResponseCallback) {
            var url = 'constants/symbols/' + market;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * Symbols for local market.
         * @param handleResponseCallback
         */
        this.symbolsLocal = function (handleResponseCallback) {
            return this.symbolsPerMarket('local', handleResponseCallback);
        };

        /**
         * Symbols for global market.
         * @param handleResponseCallback
         */
        this.symbolsGlobal = function (handleResponseCallback) {
            return this.symbolsPerMarket('global', handleResponseCallback);
        };

        /**
         * Fiat exchange rates used in the current indices calculations
         * @param market
         * @param handleResponseCallback
         */
        this.exchangeRates = function (market, handleResponseCallback) {
            var url = 'constants/exchangerates/' + market;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * local fiat exchange rates used in the current indices calculations
         * @param handleResponseCallback
         */
        this.exchangeRatesLocal = function (handleResponseCallback) {
            return this.exchangeRates('local', handleResponseCallback);
        };

        /**
         * global fiat exchange rates used in the current indices calculations
         * @param handleResponseCallback
         */
        this.exchangeRatesGlobal = function (handleResponseCallback) {
            return this.exchangeRates('global', handleResponseCallback);
        };

        /**
         * our server time that can be used as a check when using API Key authentication
         * @param handleResponseCallback
         */
        this.serverTime = function (handleResponseCallback) {
            return this.getResource('constants/time', handleResponseCallback);
        };

        /**
         * If no query parameters are sent, then returns ticker data for every supported symbol.
         * If crypto(s) and/or fiat(s) are sent as parameters, then only the ticker for those values is sent.
         * @param market - local or global
         * @param crypto - example: BTC
         * @param fiat - example: USD,EUR
         * @param handleResponseCallback
         */
        this.tickerAll = function (market, crypto, fiat, handleResponseCallback) {
            var url = 'indices/' + market + '/ticker/all?crypto=' + crypto + '&fiat=' + fiat;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * If no query parameters are sent, then returns ticker data for every supported symbol.
         * If crypto(s) and/or fiat(s) are sent as parameters, then only the local ticker for those values is sent.
         * @param crypto - example: BTC
         * @param fiat - example: USD,EUR
         * @param handleResponseCallback
         */
        this.tickerAllLocal = function (crypto, fiat, handleResponseCallback) {
            return this.tickerAll('local', crypto, fiat, handleResponseCallback);
        };

        /**
         * If no query parameters are sent, then returns ticker data for every supported symbol.
         * If crypto(s) and/or fiat(s) are sent as parameters, then only the global ticker for those values is sent.
         * @param crypto - example: BTC
         * @param fiat - example: USD,EUR
         * @param handleResponseCallback
         */
        this.tickerAllGlobal = function (crypto, fiat, handleResponseCallback) {
            return this.tickerAll('global', crypto, fiat, handleResponseCallback);
        };

        /**
         * ticker data for specified symbol
         * @param market - local or global
         * @param symbol - example: BTCUSD
         * @param handleResponseCallback
         */
        this.getTickerDataPerSymbol = function (market, symbol, handleResponseCallback) {
            var url = 'indices/' + market + '/ticker/' + symbol;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * local ticker data for specified symbol
         * @param symbol - example: BTCUSD
         * @param handleResponseCallback
         */
        this.tickerLocalPerSymbol = function (symbol, handleResponseCallback) {
            return this.getTickerDataPerSymbol('local', symbol, handleResponseCallback);
        };

        /**
         * global ticker data for specified symbol
         * @param symbol - example: BTCUSD
         * @param handleResponseCallback
         */
        this.tickerGlobalPerSymbol = function (symbol, handleResponseCallback) {
            return this.getTickerDataPerSymbol('global', symbol, handleResponseCallback);
        };

        /**
         * basic ticker denoting last and daily average price for the specified crypto/fiat values
         * @param market - local or global
         * @param crypto - comma separated list of crypto symbols (ex. 'BTC,ETH') or empty string '' if want to include all symbols
         * @param fiat - comma separated list of fiat symbols (ex. 'USD' (or empty string '' if want to include all symbols)
         * @param handleResponseCallback
         * @returns {*}
         */
        this.tickerShort = function (market, crypto, fiat, handleResponseCallback) {
            crypto = crypto || '';
            fiat = fiat || '';
            var url = 'indices/' + market + '/ticker/short?crypto=' + crypto + '&fiat=' + fiat;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * basic local ticker denoting last and daily average price for the specified crypto/fiat values
         * @param market - local or global
         * @param crypto - comma separated list of crypto symbols (ex. 'BTC,ETH') or empty string '' if want to include all symbols
         * @param fiat - comma separated list of fiat symbols (ex. 'USD' (or empty string '' if want to include all symbols)
         * @param handleResponseCallback
         * @returns {*}
         */
        this.tickerShortLocal = function (crypto, fiat, handleResponseCallback) {
            return this.tickerShort('local', crypto, fiat, handleResponseCallback);
        };

        /**
         * basic global ticker denoting last and daily average price for the specified crypto/fiat values
         * @param market - local or global
         * @param crypto - comma separated list of crypto symbols (ex. 'BTC,ETH') or empty string '' if want to include all symbols
         * @param fiat - comma separated list of fiat symbols (ex. 'USD' (or empty string '' if want to include all symbols)
         * @param handleResponseCallback
         * @returns {*}
         */
        this.tickerShortGlobal = function (crypto, fiat, handleResponseCallback) {
            return this.tickerShort('global', crypto, fiat, handleResponseCallback);
        };

        /**
         * This endpoint can be used to generate a custom index in a certain currency.
         * With the includeOrExclude parameter (“include” or “exclude”),
         * you can choose to generate an index removing the specified exchanges, or only including
         the few that you require.
         * @param symbol - ex. BTCUSD
         * @param exchanges - ex. bitstamp,bitfinex
         * @param includeOrExclude - include or exclude
         * @param handleResponseCallback
         * @returns {*}
         */
        this.tickerCustomGenericHandler = function (symbol, exchanges, includeOrExclude, handleResponseCallback) {
            var url = 'indices/ticker/custom/' + includeOrExclude + '/' + symbol + '?exchanges=' + exchanges;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * returns ticker values using only the exchanges added as argument in a comma separated format
         * @param symbol - ex. BTCUSD
         * @param exchanges - ex. bitstamp,bitfinex
         * @param handleResponseCallback
         */
        this.tickerCustomInclude = function (symbol, exchanges, handleResponseCallback) {
            return this.tickerCustomGenericHandler(symbol, exchanges, 'include', handleResponseCallback);
        };

        /**
         * Returns ticker values using all exchanges except the ones added as argument in a comma separated format.
         * @param symbol - ex. BTCUSD
         * @param exchanges - ex. bitfinex,bitstamp
         * @param handleResponseCallback
         */
        this.tickerCustomExclude = function (symbol, exchanges, handleResponseCallback) {
            return this.tickerCustomGenericHandler(symbol, exchanges, 'exclude', handleResponseCallback);
        };

        /**
         * ticker values and price changes
         * @param handleResponseCallback
         * @returns {*}
         */
        this.tickerChangesAllLocal = function (handleResponseCallback) {
            var url = 'indices/local/ticker/changes/all';
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * ticker values and price changes for given market and symbol
         * @param market - local or global
         * @param symbol
         * @param handleResponseCallback
         * @returns {*}
         */
        this.tickerChangesGeneric = function (market, symbol, handleResponseCallback) {
            var url = 'indices/' + market + '/ticker/' + symbol + '/changes';
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * local ticker values and price changes for given symbol
         * @param symbol - ex. BTCUSD
         * @param handleResponseCallback
         * @returns {*}
         */
        this.tickerChangesLocal = function (symbol, handleResponseCallback) {
            return this.tickerChangesGeneric('local', symbol, handleResponseCallback);
        };

        /**
         * global ticker values and price changes for given symbol
         * @param symbol - ex. BTCUSD
         * @param handleResponseCallback
         * @returns {*}
         */
        this.tickerChangesGlobal = function (symbol, handleResponseCallback) {
            return this.tickerChangesGeneric('global', symbol, handleResponseCallback);
        };


        /**
         * historical ticker data
         * @param market - local or global
         * @param symbol
         * @param period - alltime, monthly or daily
         * @param handleResponseCallback
         */
        this.getHistory = function (market, symbol, period, handleResponseCallback) {
            period = period || '';
            var url = 'indices/' + market + '/history/' + symbol + '?period=' + period;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * historical data for local ticker
         * @param symbol
         * @param period
         * @param handleResponseCallback
         */
        this.historyLocal = function (symbol, period, handleResponseCallback) {
            return this.getHistory('local', symbol, period, handleResponseCallback);
        };

        /**
         * historical data for global ticker
         * @param symbol
         * @param period
         * @param handleResponseCallback
         */
        this.historyGlobal = function (symbol, period, handleResponseCallback) {
            return this.getHistory('global', symbol, period, handleResponseCallback);
        };

        /**
         * historical ticker data since timestamp
         * @param market - local or global
         * @param symbol - example: BTCUSD
         * @param since - Unix timestamp in seconds
         * @param handleResponseCallback
         */
        this.dataSinceTimestamp = function (market, symbol, since, handleResponseCallback) {
            since = since || '';
            var url = 'indices/' + market + '/history/' + symbol + '?since=' + since;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * local historical ticker data since timestamp
         * @param symbol - example: BTCUSD
         * @param since - Unix timestamp in seconds
         * @param handleResponseCallback
         */
        this.dataSinceTimestampLocal = function (symbol, since, handleResponseCallback) {
            return this.dataSinceTimestamp('local', symbol, since, handleResponseCallback);
        };

        /**
         * global historical ticker data since timestamp
         * @param symbol - example: BTCUSD
         * @param since - Unix timestamp in seconds
         * @param handleResponseCallback
         */
        this.dataSinceTimestampGlobal = function (symbol, since, handleResponseCallback) {
            return this.dataSinceTimestamp('global', symbol, since, handleResponseCallback);
        };

        /**
         * price at specified timestamp (unix format)
         * @param market - local or global
         * @param symbol
         * @param timestamp - Unix timestamp (in seconds)
         * @param handleResponseCallback
         * @returns {*}
         */
        this.priceAtTimestamp = function (market, symbol, timestamp, handleResponseCallback) {
            var url = 'indices/' + market + '/history/' + symbol + '?at=' + timestamp;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * local price at the specified timestamp for local ticker
         * @param symbol
         * @param timestamp
         * @param handleResponseCallback
         * @returns {*}
         */
        this.priceAtTimestampLocal = function (symbol, timestamp, handleResponseCallback) {
            return this.priceAtTimestamp('local', symbol, timestamp, handleResponseCallback);
        };

        /**
         * local price at the specified timestamp for global ticker
         * @param symbol
         * @param timestamp
         * @param handleResponseCallback
         * @returns {*}
         */
        this.priceAtTimestampGlobal = function (symbol, timestamp, handleResponseCallback) {
            return this.priceAtTimestamp('global', symbol, timestamp, handleResponseCallback);
        };

        /**
         * a list of all exchanges with their integrated symbols and data.
         * Data can be filtered by crypto or fiat currency
         * @param crypto
         * @param fiat
         * @param handleResponseCallback
         * @returns {*}
         */
        this.allExchangesData = function (crypto, fiat, handleResponseCallback) {
            crypto = crypto || '';
            fiat = fiat || '';
            var url = 'exchanges/all?crypto=' + crypto + '&fiat=' + fiat;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * Returns a list of all exchanges with their integrated symbols and data.
         * By specifying symbol, data will be filtered and only shown for that symbol.
         * @param symbol
         * @param handleResponseCallback
         * @returns {*}
         */
        this.allExchangeDataForSymbol = function (symbol, handleResponseCallback) {
            var url = 'exchanges/all?symbol=' + symbol;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * Returns specified exchange’s symbols and data as parameter for the callback function.
         * @param exchangeName
         * @param handleResponseCallback
         * @returns {*}
         */
        this.perExchangeData = function (exchangeName, handleResponseCallback) {
            var url = 'exchanges/' + exchangeName;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * Return a total of integrated exchanges along with ignored, included and inactive status counts
         * @param handleResponseCallback
         */
        this.exchangeCount = function (handleResponseCallback) {
            return this.getResource('exchanges/count', handleResponseCallback);
        };

        /**
         * Returns a list of exchanges that failed our sanity checks.
         * Provides what value failed and on what orderbook
         * @param handleResponseCallback
         */
        this.outlierExchanges = function (handleResponseCallback) {
            return this.getResource('exchanges/outliers', handleResponseCallback);
        };

        /**
         * Returns exchanges that are either ignored or inactive according to specified state parameter.
         * With ignored exchanges a “ignore_reason” is provided
         * @param handleResponseCallback
         */
        this.ignoredExchanges = function (handleResponseCallback) {
            return this.getResource('exchanges/ignored', handleResponseCallback);
        };

        /**
         * Returns list of inactive exchanges.
         * @param handleResponseCallback
         */
        this.inactiveExchanges = function (handleResponseCallback) {
            return this.getResource('exchanges/incactive', handleResponseCallback);
        };

        /**
         * Returns a list of currencies and their weights that are used to produce our Global Bitcoin Price Index
         * @param handleResponseCallback
         * @returns {*}
         */
        this.currencyWeights = function (handleResponseCallback) {
            return this.getResource('weighting/currencies', handleResponseCallback);
        };

        /**
         * Returns a list of exchanges, their symbols, and their associated weights
         * @param handleResponseCallback
         */
        this.exchangeWeights = function (handleResponseCallback) {
            return this.getResource('weighting/exchanges', handleResponseCallback);
        };

        /**
         * Return conversion from "from" currency to "to" currency,
         * where one of "from" and "to" is valid crypto and the other valid fiat.
         * @param market - global or local
         * @param from - fiat or crypto
         * @param to - fiat or crypto (different than from)
         * @param amount - amount of "from" currency you want to convert
         * @param handleResponseCallback
         */
        this.performConversion = function (market, from, to, amount, handleResponseCallback) {
            var url = 'convert/' + market + '?from=' + from + '&to=' + to + '&amount=' + amount;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * Performing conversion using the local ticker values.
         * @param from - fiat or crypto
         * @param to - fiat or crypto (different than from)
         * @param amount - amount of "from" currency you want to convert
         * @param handleResponseCallback
         */
        this.performConversionLocal = function (from, to, amount, handleResponseCallback) {
            return this.performConversion('local', from, to, amount, handleResponseCallback);
        };

        /**
         * Performing conversion using the global ticker values.
         * @param from - fiat or crypto
         * @param to - fiat or crypto (different than from)
         * @param amount - amount of "from" currency you want to convert
         * @param handleResponseCallback
         */
        this.performConversionGlobal = function (from, to, amount, handleResponseCallback) {
            return this.performConversion('global', from, to, amount, handleResponseCallback);
        };

        /**
         * Returns the price for the specified symbol at the time the hash transaction was confirmed.
         * @param symbol - crypto-fiat pair (example BTCUSD)
         * @param hash - valid transaction hash
         * @param handleResponseCallback
         */
        this.blockchainTxPrice = function (symbol, hash, handleResponseCallback) {
            var url = 'blockchain/tx_price/' + symbol + '/' + hash;
            return this.getResource(url, handleResponseCallback);
        };

        /**
         * Returns ticket used in the websocket authentication process.
         * @param handleResponseCallback
         */
        this.getTicket = function (handleResponseCallback) {
            var url = 'websocket/get_ticket';
            return this.getResource(url, handleResponseCallback);
        };

        return this;

    }
};

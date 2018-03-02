'use strict';

const config = require('../config');
const ws = require('ws');
const restfulClient = require('./restful-client');


module.exports = {
    WebsocketClient: function (publicKey, secretKey) {
        this.publicKey = publicKey;
        this.secretKey = secretKey;

        this.connect = function (url, subscriptionMessage, callbackHandlerFunction) {
            console.log('connecting...');
            var restClient = restfulClient.RestfulClient(this.publicKey, this.secretKey);
            restClient.getTicket(function (response) {
                var ticket = JSON.parse(response)['ticket'];
                var wsUrl = url + '?public_key=' + publicKey + '&ticket=' + ticket;
                var websocket = new ws(wsUrl);

                websocket.onmessage = function (msg) {
                    var res = JSON.parse(msg.data);
                    callbackHandlerFunction(res);
                };

                websocket.onopen = function () {
                    console.log('opening');
                    var msg = JSON.stringify(subscriptionMessage);
                    websocket.send(msg);
                }
            })
        };

        /**
         * Connects to the websocket which gives ticker data for the specified market and symbol.
         * Override received_message() for custom usage.
         * @param market - local or global
         * @param symbol - crypto-fiat pair (example BTCUSD)
         * @param handleResponseCallback - function which handles the received response message from the socket
         */
        this.connectToTickerWebsocket = function (market, symbol, handleResponseCallback) {
            var wsUrl = config.WEBSOCKET_PREFIX + 'ticker';
            var subscriptionMessage = {
                "event": "message",
                "data": {
                    "operation": "subscribe",
                    "options": {
                        "currency": symbol,
                        "market": market
                    }
                }
            };
            this.connect(wsUrl, subscriptionMessage, handleResponseCallback);
        };

        /**
         * Connects to the websocket which gives data for the given exchange.
         * @param exchangeName - lowercase exchange name (example: kraken)
         * @param handleResponseCallback - function which handles the received response message from the socket
         */
        this.connectToExchangeWebsocket = function (exchangeName, handleResponseCallback) {
            var wsUrl = config.WEBSOCKET_PREFIX + 'exchanges';
            var subscriptionMessage = {
                "event": "message",
                "data": {
                    "operation": "subscribe",
                    "options": {
                        "exchange": exchangeName
                    }
                }
            };
            this.connect(wsUrl, subscriptionMessage, handleResponseCallback);
        };

        return this;
    }
};


var defer = require('when').defer;
var request = require('request');
var exchanges = {
  'btc-e': require('./exchange/btc-e'),
  'vircurex': require('./exchange/vircurex'),
  'bter': require('./exchange/bter')
};

function getData (exchange, currency, base) {
  var deferred = defer();

  if (!currency)
    return deferred.reject(new Error('Cryptocurrency must be defined'));

  if (!base)
    return deferred.reject(new Error('Base currency must be defined'));

  if (!~Object.keys(exchanges).indexOf(exchange))
    return deferred.reject(new Error('Exchange is not supported'));

  var exModule = exchanges[exchange];
  request({
    url: exModule.getURL(currency, base),
    json: true
  }, function (err, res, body) {
    if (err) return deferred.reject(err);

    try {
      deferred.resolve(exModule.formatResponse(body));
    } catch (e) {
      deferred.reject(e);
    }
  });

  return deferred.promise;
}
exports.getData = getData;

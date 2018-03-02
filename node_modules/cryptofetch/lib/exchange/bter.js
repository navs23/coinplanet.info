var API_URL = 'https://bter.com/api/1/ticker/';

function getURL (currency, baseCurrency) {
  return API_URL + currency.toLowerCase() + '_' + baseCurrency.toLowerCase();
}
exports.getURL = getURL;

function formatResponse (res) {
  return {
    high: res.high,
    low: res.low,
    last: res.last,
    sell: res.sell,
    buy: res.buy,
    avg: res.avg
  };
}
exports.formatResponse = formatResponse;

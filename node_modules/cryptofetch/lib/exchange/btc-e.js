var API_URL_HEAD = 'https://btc-e.com/api/2/';
var API_URL_TAIL = '/ticker';

function getURL (currency, baseCurrency) {
  var mid = (currency || '').toLowerCase() + '_' +
            (baseCurrency || '').toLowerCase();
  return API_URL_HEAD + mid + API_URL_TAIL
}
exports.getURL = getURL;

function formatResponse (response) {
  var res = response.ticker;
  return {
    high: res.high,
    low: res.low,
    avg: res.avg,
    vol: res.vol,
    last: res.last,
    buy: res.buy,
    sell: res.sell
  };
}
exports.formatResponse = formatResponse;

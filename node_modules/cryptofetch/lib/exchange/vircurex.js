var API_URL = 'https://vircurex.com/api/get_info_for_1_currency.json';

function getURL (currency, baseCurrency) {
  var params = '?base=' + (currency || '').toLowerCase();
  params += '&alt=' + (baseCurrency || '').toLowerCase();
  return API_URL + params;
}
exports.getURL = getURL;

function formatResponse (res) {
  return {
    high: +res.highest_bid,
    low: +res.lowest_ask,
    last: +res.last_trade
  };
}
exports.formatResponse = formatResponse;

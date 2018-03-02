var fetch = require('../');
var when = require('when');
var chai = require('chai');
var expect = chai.expect;

var exchanges = ['btc-e', 'vircurex', 'bter'];

describe('cryptofetch', function () {
  exchanges.forEach(function (ex) {
    it('works with lower case (' + ex + ')', function (done) {
      fetch(ex, 'ltc', 'btc').then(function (data) {
        expect(data.high).to.be.a('number');
        expect(data.low).to.be.a('number');
        done();
      }, done);
    });

    it('works with upper case (' + ex + ')', function (done) {
      fetch(ex, 'LTC', 'BTC').then(function (data) {
        expect(data.high).to.be.a('number');
        expect(data.low).to.be.a('number');
        done();
      });
    });
  });

  it('fails for invalid exchange', function (done) {
    fetch('notreal', 'ltc', 'btc').then(null, function (err) {
      expect(err).to.be.ok
      done();
    });
  });
  
  it('fails for missing currency', function (done) {
    fetch('bter').then(null, function (err) {
      expect(err).to.be.ok
      done();
    });
  });
  
  it('fails for missing base', function (done) {
    fetch('bter', 'ltc').then(null, function (err) {
      expect(err).to.be.ok
      done();
    });
  });
  
  it('fails for invalid combination', function (done) {
    fetch('btc-e', 'btc', 'ppc').then(null, function (err) {
      expect(err).to.be.ok
      done();
    });
  });
});

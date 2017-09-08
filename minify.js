var compressor = require('node-minify');
compressor.minify({
  compressor: 'gcc',
  input: './website/public/javascripts/index.js',
  output: './website/public/javascripts/index.min.js',
  callback: function (err, min) {}
});
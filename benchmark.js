var Benchmark = require('benchmark'),
  add = require('./');


var testData = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7]


var addCustom = require('./');


var addNative = function(p) {
  var result = 0;
  for (var i=0; i<testData.length; ++i) {
    result += testData[i];
  }
  return result;
};



// add tests
new Benchmark.Suite().add('add', {
  fn: function() {
    return addCustom(testData);
  }
})
.add('native', {
  fn: function() {
    return addNative(testData);
  }
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log("Native is ~" + (this[1].hz / this[0].hz).toFixed(1) + " times faster");
})
.run();

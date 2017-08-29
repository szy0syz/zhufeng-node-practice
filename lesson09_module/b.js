function B() {
  console.log('B');
}
console.log('B is loading');
console.log('module.loaded: ', module.loaded);
var a = require('./a');
module.exports = {
  B: B,
  a: a,
  test: function () {
    console.log(module.loaded);
  }
};
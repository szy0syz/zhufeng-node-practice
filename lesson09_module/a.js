function A() {
  console.log('A');
}

console.log('A is loading');
console.log('module.loaded: ', module.loaded);
var b = require('./b');
module.exports = {
  A: A,
  name: 'aaaaa'
};
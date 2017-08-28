function eat(times, callback) {
  var _times = 0;
  return function() {
    _times++;
    if (_times >= times) {
      callback && callback();
    }
  }
}

var newEat = eat(6, function() {
  console.log('吃完了');
})

console.log('1');
newEat();
console.log('2');
newEat();
console.log('3');
newEat();
console.log('4');
newEat();
console.log('5');
newEat();
console.log('6');
newEat();
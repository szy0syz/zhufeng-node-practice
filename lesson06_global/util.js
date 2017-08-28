function Parent() {
  this.name = 'Parent';
  this.age = '29';
  function say() {
    console.log('hello ' + this.name);
  }
}

Parent.prototype.showName = function () {
  console.log(this.name);
}

function Child() {
  this.name = 'Chind';
}

//原型继承
// Child.prototype = new Parent;
// 其实node的util也给我们封装了一个继承方法
var util = require('util');
util.inherits(Child, Parent);
var child = new Child();
child.showName(); 
console.log(child.__proto__.__proto__.__proto__ === Object.prototype);

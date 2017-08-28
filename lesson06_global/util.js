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

// 第一种继承：原型继承
Child.prototype = new Parent;
var child = new Child();
child.showName(); 

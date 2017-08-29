//exports = module.exports;

var Person = function(name, age) {
  this._name = name;
  this._age = age;
}

Person.prototype.getName = function() {
  return this._name;
}

Person.prototype.setName = function(name) {
  this._name = name;
}

Person.prototype.getAge = function() {
  return this._age;
}

Person.prototype.setName = function(age) {
  this._age = age;
}

Person.prototype.home = "中国";

// exports = Person;
// 在导出引用类型对象时，还必须使用module.exports来导出！
module.exports = Person;
// return module.exports;
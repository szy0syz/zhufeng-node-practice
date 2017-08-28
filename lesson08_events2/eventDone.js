// 此时仅加载进来一个类！
var EventEmitter = require('events');
// 实例化这个类
var eve = new EventEmitter();
// 一个将两个异步操作结果合并的小demo
var fs = require('fs'),
  person = {},
  count = 0;
// 都怪vs~修改一下~
process.chdir(__dirname);

// 注册事件，data事件的回调函数
eve.on('data', out);

fs.readFile('name.txt', 'utf8', function (err, data) {
  person.name = data;
  // 如果异步读取到值，发射data事件到监听处
  eve.emit('data');
});
fs.readFile('age.txt', 'utf8', function (err, data) {
  person.age = data;
  // 如果异步读取到值，发射data事件到监听处
  eve.emit('data');
});

function out() {
  if(person.name && person.age) {
    console.log(person.name, person.age);
  }
}
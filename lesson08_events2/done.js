
// 一个将两个异步操作结果合并的小demo
var fs = require('fs'),
  person = {},
  count = 0;
// 都怪vs~修改一下~
process.chdir(__dirname);
fs.readFile('name.txt', 'utf8', function(err, data) {
  person.name = data;
  if(++count == 2) {
    out();
  }
});
fs.readFile('age.txt', 'utf8', function(err,data) {
  person.age = data;
  if(++count == 2) {
    out();
  }
});

function out() {
  console.log(person.name, person.age);
}
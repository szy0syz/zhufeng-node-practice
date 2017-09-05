/**
 * 使用fs.write()方法写入文件
 */

var fs = require('fs');
var path = require('path');
process.chdir(__dirname);

var fd = fs.openSync('jerry' + (Math.random() * 10000).toFixed() + '.txt', 'a');

for (var i = 0; i < 3; i++) {
  var buff = new Buffer('szy' + i + '\r\n');
  var len = buff.length;
  var pos = i * len;
  console.log(buff, pos);
  fs.write(fd, buff, 0, len, pos, function (err, written, string) {
    if (err) {
      console.log('write err');
      return;
    }
    console.log('write ok', written);
  });
}
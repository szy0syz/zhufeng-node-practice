var fs = require('fs');
var path = require('path');
process.chdir(__dirname);

var fd = fs.openSync('jerry' + (new Date()).getMilliseconds() + '.txt', 'a');

for (var i = 0; i < 3; i++) {
  var buff = new Buffer('szy' + i);
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
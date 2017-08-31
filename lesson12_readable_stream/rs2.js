var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt', {
  highWaterMark: 3, // 强制流读两次数据
  encoding: 'utf8',
  start: 0,
  end: 5
});

rs.pause();

setTimeout(function() {
  rs.on('data', function (data) {
    console.log(data);
  });
}, 5);

rs.resume(); // 切换流到流动模式

rs.on('end', function () {
  console.log('finished...');
  rs.close();
  console.log('stream is closed...');
});
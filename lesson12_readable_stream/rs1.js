var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt', {
  highWaterMark: 3, // 设置缓存区大小为3，那这个流因为要读6个字节，所以导致data事件执行两次
  encoding: 'utf8',
  start: 0,
  end: 5
});

rs.on('data', function (data) {
  console.log(data);
  rs.pause(); // 将流切换成非流动模式/暂停模式，此时就不会触发data事件！
  setTimeout(function() {
    rs.resume(); // 切换流到流动模式
    // 这时，先打印123后，等2秒后再打印456，再触发end事件！
  },2000);
});

rs.on('end', function () {
  console.log('finished...');
  rs.close();
  console.log('stream is closed...');
});
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
  // 如果这里加了setTimeout(function() {console.log(data);}, 5000);
  // 此时会先打印finished，再打印123，456！
  // 其实这就是流的特点
});

rs.on('end', function () {
  console.log('finished...');
});
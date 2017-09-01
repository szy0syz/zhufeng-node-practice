var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt', {
  highWaterMark: 2,
  start: 0,
  end: 8 
});
var counter = 0;
rs.on('readable', function() {
  console.log('===readable===  No.',counter++);
  console.log('In readable -> rs.read(1): ', rs.read(1));
});
rs.on('data', function(data) {
  console.log('===data===  No.',counter++);
  console.log(data);
  console.log('In data -> rs.read(1): ' ,rs.read(1)); // 流动模式的流我们读不到缓存区数据了！
});
rs.on('end', function() {
  // 流一般都带自动关闭
  // rs.close();
  console.log('===end===  No.',counter++);
});

// ===data===  No. 0
// <Buffer 31 32 33>
// In data -> rs.read(1):  null
// ===data===  No. 1
// <Buffer 34 35 36>
// In data -> rs.read(1):  null
// ===data===  No. 2
// <Buffer 37 38 39>
// In data -> rs.read(1):  null
// ===readable===  No. 3
// In readable -> rs.read(1):  null
// ===end===  No. 4
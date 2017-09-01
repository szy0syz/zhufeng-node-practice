var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt', {
  highWaterMark: 5,
  start: 0,
  end: 9  // 设置了只读0~5，6个数
});
var buffers = [], counter = 0;
rs.on('readable', function() {
  console.log('===readable===');
  var buff;
  //执行一次read()方法，缓存区指针就变一次，谨慎啊！
  while(null != (buff = rs.read(2))) {
    console.log('buf:', buff);
    buffers.push(buff);
    counter++;
    console.log('counter', counter);
  }
});
rs.on('end', function() {
  rs.close();
  var data = Buffer.concat(buffers);
  console.log('data', data);
  console.log('finished...');
});
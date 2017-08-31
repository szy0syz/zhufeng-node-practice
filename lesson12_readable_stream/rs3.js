var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt', {
  highWaterMark: 7,
  // encoding: 'utf8',
  start: 0,
  end: 5  // 设置了只读0~5，6个数
});
var buffers = [], counter = 0;
rs.on('readable', function() {
  console.log('===readable===');
  var buff;
  // console.log(rs.read(1)); //最后一次进来，rs.read(1)返回的结果是null
  while(null != (buff = rs.read(1))) {
    buffers.push(buff);
    counter++;
    console.log(counter);
  }
});
// console.log(rs);
rs.on('end', function() {
  rs.close();
  var data = Buffer.concat(buffers);
  console.log(data);
  console.log('finished...');
});
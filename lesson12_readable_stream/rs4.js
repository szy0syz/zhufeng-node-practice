var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt', {
  highWaterMark: 3,
  // encoding: 'utf8',
  start: 0,
  end: 8 
});

rs.on('readable', function() {
  console.log('===readable===');
});
rs.on('data', function(data) {
  console.log('===data===');
  console.log(data);
});
rs.on('end', function() {
  // 流一般都带自动关闭
  rs.close();
  console.log('finished...');
});
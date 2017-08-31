var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./project.zip');
var ws = fs.createWriteStream('./project_copy.zip');

rs.on('data', function (data) {
  // 这里可读流没设置最高水位线，应该是64kb，我打印个看看
  console.log(data.length);
  var flag = ws.write(data);
  console.log(flag);
});

ws.on('drain', function () {
  console.log('===drain===');
})

rs.on('end', function() {
  console.log('文件读取完毕');
})

//////
// ===drain===
// 65536
// false
// ===drain===
// 65536
// false
// ...
// ...
// ===drain===
// 65536
// false
// ===drain===
// 13347
// true
// 文件读取完毕
var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt');
var ws = fs.createWriteStream('./write.txt');

ws.on('open', function(){
  console.log('写入文件已经打开');
});

rs.on('data', function(data) {
  ws.write(data); // 写入
});

rs.on('data', function() {
  // 异步方法：追加`写入完成`四个字在文末
  ws.end('写入完毕', function() { // 写入并关闭
    console.log('写入完毕');
    console.log('共写入%d字节', ws.bytesWritten);
  })
});

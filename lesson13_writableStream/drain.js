var fs = require('fs');
process.chdir(__dirname);
var ws = fs.createWriteStream('./test.txt', {
  highWaterMark: 17
});
// drain演示demo：使用递归不停往缓存区里覆写数据，不使用可写流默认用内存空间的功能
writeMillion(ws, 'data', 'utf8', function () { });
function writeMillion(writer, data, encoding, callback) {
  var i = 1000000;
  write();
  function write() {
    var ok = true;
    do {
      i -= 1;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
        console.log(ok);
      }
    } while(i > 0 && ok);
    if (i > 0) { // 又是递归~~
      writer.once('drain', write);
    }
  }
}
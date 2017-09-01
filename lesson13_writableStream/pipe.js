var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt');
var ws = fs.createWriteStream('./write.txt');

// pipe的简单实用
// rs.pipe(ws);

// pipe的运行原理
rs.on('data', function(data) {
  var flag = ws.write(data);
  if (!flag) {
    // 诶，ws那边写满缓存区了，rs这边暂停一下，等着ws将缓存区内数据全部写入对象再说
    rs.pause();
  }
});

ws.on('drain', function() {
  // 欧耶，ws这边已经缓存区内容全部写完，回复rs为流通模式，打开pipe上游的小阀门
  rs.resume();
});
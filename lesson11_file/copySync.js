
function copySync(src, tar) {
  var fs = require('fs');
  process.chdir(__dirname);

  var list = [], size = 0, length = 255, flag = true; // 8k

  // 实现copy小栗子
  // 第一步：我们要创建一个缓存区的话，肯定要知道文件的大小嘛，fd好像可以看到文件大小，我看看node源码readFile怎么写的。
  // 哎，node的readFile里有别的方法确认大小，我们就有标准api吧
  size = fs.statSync(src).size;
  var res = new Buffer(size)
  var fd = fs.openSync(src, 'r');
  fs.readSync(fd, res, 0, size, 0);
  var fd_wtire = fs.openSync(tar, 'w');
  fs.writeSync(fd_wtire, res, 0, size, 0);
  fs.closeSync(fd);
  fs.closeSync(fd_wtire);
  console.log('同步模式复制文件完毕');
}

copySync('src.txt', 'tar.txt');
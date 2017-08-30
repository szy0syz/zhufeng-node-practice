var fs = require('fs');
process.chdir(__dirname);

var res = new Buffer(8192), list = []; // 8k

// 实现异步读取文件，每次读3个字节！
fs.open('line.txt', 'r', function (err, fd) {
  var pos = 0; // 这个表示目标文件从哪读取的位置
  function read() {
    // 创建一个临时buffer当做缓存区，接收读到的那个字符
    var buffer = new Buffer(3);
    fs.read(fd, buffer, 0, 3, pos, function (err, bytesRead) {
      // 读取文件内容，将二级制buffer存到数组中
      list.push(buffer);
      // 设置文件读取位置，方便下次读取
      pos += bytesRead;
      // 如果还能读到内容
      if (bytesRead > 0) {
        // 递归执行这个函数
        read();
      }
      else {
        // 使用Buffer类的静态方法将数组链接成新Buffer
        var res = Buffer.concat(list);
        console.log(res.slice(0, pos).toString());
      }
    })
  };
  read();
});
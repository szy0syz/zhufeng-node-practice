var fs = require('fs');
process.chdir(__dirname);
// demo要求：例如4个汉字，异步方式，两个两个的分别读取

// 第零步：创建buffer
var buffer = new Buffer(12); // 我已经提前知道长度了：4个汉字*3=12
// console.log(buffer); // <Buffer 00 00 38 00 00 00 00 00 d9 e9 ca 00>
// 第一步: 打开文件
fs.open('line.txt', 'r',function (err, fd) {
  // 第二步：执行第一次异步，读取一个汉字
  fs.read(fd, buffer, 0, 3, 0, function (err, bytesRead, buffer) {
    console.log('bytesRead:',bytesRead);
    console.log('第一次读取的内容: ' + buffer); //奇怪，为什么有乱码呢？原来实例化时被填充了一些数字
    // 第三部：异步嵌套执行，读取第2~4个汉字
    fs.read(fd, buffer, 3, 9, 3, function (err, bytesRead, buffer) {
      console.log('bytesRead:',bytesRead);
      console.log('第二次读取的内容: ' + buffer.toString());
    });
  });
});
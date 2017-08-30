// 用个vs也是用烦了, 我是不是优化配置一下，省得这样麻烦。
process.chdir(__dirname);

////// 模拟fs.readFile内部实现流程 //////
var fs = require('fs');

var fd = fs.openSync('line.txt', 'r');

// 我在line.txt里就写了三个字符szy
var buffer = new Buffer(3);

/**
 * fd 文件描述符(正常情况下是3，因为0被stdout占用，1被stdin占用，2倍stderr占用)
 * buffer 往buffer里写的偏移量
 * length 长度(这次写入的长度)
 * position 文件的当前读取位置
 */
fs.readSync(fd, buffer, 0 ,3);
console.log(buffer);
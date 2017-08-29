// vs的配置问题
process.chdir(__dirname);
var fs = require('fs');
// 使用fs模块读取文件时，默认就是二进制！
var content = fs.readFileSync('index.js');
console.log(content);
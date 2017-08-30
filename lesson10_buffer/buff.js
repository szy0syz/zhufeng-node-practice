var buff = new Buffer(12); // 一个汉字3个字节，4个汉字12个字节
buff.write("振宇", 0, 6);  // 写两个汉字进入buff，从0开始，写6个字节
buff.write("集团", 6, 6);  // 写入两个函数进buff，从6索引开始，写6个字节
console.log(buff.toString());
/////////////////////////////

var buffer = new Buffer('振宇集团');
var buf1 = buffer.slice(0,7);
var buf2 = buffer.slice(7);
console.log(buf1.toString());
console.log(buf2.toString());

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder(); // 为什么导出成类呢？因为每个实例都需要存储自己的状态
console.log(decoder.write(buf1));
console.log(decoder.write(buf2));
// StringDecoder 大概实现原理为 输出buf1时如果解码出现非法字符，看哈有没有底下连续输出的，又就凑对拼接后再输出

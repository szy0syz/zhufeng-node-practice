var A = require('./a');
var B = require('./b');

// 只有全部加载完后才会加载完毕
B.test();
// 循环依赖时，B模块内加载的A模块时，大部分属性都访问不到。
console.log(B.a.name);
console.log(A.name);
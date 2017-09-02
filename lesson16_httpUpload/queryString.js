var qs = require('querystring');
var obj = qs.parse('name=szy&age=18&sex=1');
console.log(obj);
// 参数1指定分隔符，参数2指定key和val的连接符，最大转换参数个数
obj = qs.parse('name#szy;age#18', ';', '#', { maxKeys: 2 });
console.log(obj);
console.log(qs.stringify(obj));
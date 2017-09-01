var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createWriteStream('./request.txt'); // 等会这里改最高水位线测试

// 解析头部
var StringDecoder = require('string_decoder').StringDecoder;
function parseHeader(callback) {
  var headers = '';
  rs.on('readable', onReadable);
  var decoder = new StringDecoder();
  function onReadable() {
    var chunk;
    while (null != (chunk = rs.read())) { // 将缓存区所有内容一次读出
      var str = decoder.write(chunk);
      console.log('从可读流缓存区读到的内容:', str);
      if (str.match(/\r\n\r\n/)) { // 如果读到的这个内容包含两个回车换行，说明到分界线了
        // 到分界线后就不消再监听了
        rs.removeListener('readable', onReadable);
        var splits = str.split(/\r\n\r\n/);
        headers += splits.shift(); // 将数组索引0的内容移出给headers
        var remain = splits.join(/\r\n\r\n/);
        var buf = new Buffer(remain, 'utf8');
        if (buf.length) {
          rs.unshift(buf);
        }
        callback(headers);
      } else {
        headers += str;
      }
    }
  }
}
console.trace();
parseHeader(function (h) {
  console.log(h);
  console.log('======');
  rs.on('data', function (data) {
    console.log(data);
  });
});

rs.on('end', function() {
  console.log('finished...');
})
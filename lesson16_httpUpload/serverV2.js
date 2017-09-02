var http = require('http');
var querystring = require('querystring');
var util = require('util');
http.createServer(function (req, res) {
  // headers的属性全部都是小写
  var contentType = req.headers['content-type'];
  req.setEncoding('utf8');
  var result = '';
  //因为req和res都是流 
  req.on('data', function (data) {
    result += data;
  });
  req.on('end', function (data) {
    var obj;
    if(contentType === 'application/json') {
      obj = JSON.parse(result);
    }
    if (contentType === 'application/x-www-form-urlencoded') {
      obj = querystring.parse(result);
    }
    console.log('发送客户端数据');
    res.end(util.inspect(obj));
  })
}).listen(8080, function () {
  console.log('server is running...');
});
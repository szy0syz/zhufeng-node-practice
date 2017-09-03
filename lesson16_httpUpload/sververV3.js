var http = require('http');
var querystring = require('querystring');
var util = require('util');
var fs = require('fs');
var url = require('url');
process.chdir(__dirname);
http.createServer(function (req, res) {
  // headers的属性全部都是小写
  var urlObj = url.parse(req.url, true); // 确定转换为对象方式
  var pathname = urlObj.pathname;
  if(pathname === '/') {
    fs.createReadStream('./index.html').pipe(res);
  } else if (pathname === '/post') {
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
  }

  
}).listen(8080, function () {
  console.log('server is running...');
});
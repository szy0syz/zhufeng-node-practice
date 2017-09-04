var querystring = require('querystring');
var http = require('http');
var util = require('util');
var formidable = require('formidable');
// var mine = require('mine');
var url = require('url');
var fs = require('fs');
process.chdir(__dirname);
var app = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true); // 确定转换为对象方式
  var pathname = urlObj.pathname;
  if(pathname === '/') {
    fs.createReadStream('./index.html').pipe(res);
  } else if (pathname === '/post') {
    var parse = new formidable.IncomingForm();
    parse.parse(req, function(err, fields, files) {
      if(err) {
        res.end('file error');
      }
      console.log(files);
      res.end('file ok');
    })
  } else {
    res.end('404');
  }

}).listen(8088, function() {
  console.log('server is running...');
});
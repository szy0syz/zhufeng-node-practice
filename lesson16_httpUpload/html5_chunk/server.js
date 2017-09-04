var querystring = require('querystring');
var http = require('http');
var util = require('util');
var url = require('url');
var formidable = require('formidable');
var url = require('url');
var fs = require('fs');
var path = require('path');
process.chdir(__dirname);
var app = http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true); // 确定转换为对象方式
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    fs.createReadStream('./index.html').pipe(res);
  } else if (pathname === '/post') {
    var parse = new formidable.IncomingForm();
    parse.parse(req, function (err, fields, files) {
      if (err) {
        res.end('file error');
      }
      var file = files.data;
      var filename = fields.name;
      var total = fields.total;
      var index = fields.index;
      var size = fields.size;
      // 教程里这里创建可读流写一个新文件，太费性能了，改名就好了嘛
      // var src = fs.createReadStream()
      // 同步还是异步呢
      fs.renameSync(file.path, file.path.replace(path.basename(file.path), filename + '.' + index));
      //fs.rename(file.path, file.path.replace(path.basename(file.path), filename + '.' + index));
      console.log(file.path);



      res.end('file ok');
    })
  } else {
    res.end('404');
  }

}).listen(8088, function () {
  console.log('server is running...');
});
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
      var file = files.fileUpload;
      var filename = files.name;
      var total = files.total;
      var index = files.index;
      var size = files.size;
      // 教程里又读写一个新文件，太费性能了，改名就好了
      // var src = fs.createReadStream()
      console.log(path.basename(file.path));
      fs.renameSync(file.path)





      res.end('file ok');
    })
  } else {
    res.end('404');
  }

}).listen(8088, function () {
  console.log('server is running...');
});
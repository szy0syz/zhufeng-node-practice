var querystring = require('querystring');
var http = require('http');
var util = require('util');
var url = require('url');
var formidable = require('formidable');
var url = require('url');
var fs = require('fs');
var path = require('path');
process.chdir(__dirname);
var renameCount = 0; // 这里只能同时处理一个任务
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
      var total = Number(fields.total);
      var index = fields.index;
      var size = Number(fields.size);
      var fileSize = Number(fields.fileSize);
      var tempDir = path.dirname(file.path);
      var fd = fs.openSync(filename, 'a');
      // 教程里这里创建可读流写一个新文件，太费性能了，改名就好了嘛
      // var src = fs.createReadStream();
      fs.rename(file.path, file.path.replace(path.basename(file.path), filename + '.' + index), function () {
        if (renameCount === total - 1) {
          
          var files = fs.readdirSync(tempDir);
          files.forEach(function (item) {
            if (item.startsWith(filename + '.')) {
              // 计算二进制文件pos位置
              var pos = Number(path.extname(item).slice(1)) * size;
              fs.readFile(tempDir + '/' + item, function (err, buff) {
                if (err) {
                  // 删除当前临时文件(以前的都已经清除了)
                  fs.unlinkSync(tempDir + '/' + item);
                  res.end('loaded err');
                  return;
                }
                fs.writeSync(fd, buff, 0, buff.length, pos);
                renameCount--;
                // 删除上传的临时文件
                fs.unlinkSync(tempDir + '/' + item);
                if (renameCount === 0) {
                  fs.closeSync(fd);
                }
              });
            }
          });
          renameCount = 0;
        } else {
          renameCount++;
        }
      });

      res.end('file ok');
    })
  } else {
    res.end('404');
  }

}).listen(8088, function () {
  console.log('server is running...');
});
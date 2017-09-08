"use strict";

var fs = require('fs');
var path = require('path');

module.exports = function (app) {
  app.use(function (req, res, next) {
    var rs = fs.createReadStream(path.join(__dirname, 'public', req.path));
    rs.on('error', function () {
      // 如果取静态文件夹读文件没读到触发error事件，则调用next()方法
      next();
    });
    rs.pipe(res);
  });
}
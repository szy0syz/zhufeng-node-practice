var express = require('express');
var path = require('path');

var app = express();

app.use('/imgs', function (req, res, next) {
  var referer = req.headers.referer;
  var whiteList = ['a.szy.com']; // 白名单功能
  // 在Express中，如果访问本域的本地文件时referer是undefined的
  // 那就允许访问资源文件
  if (!referer) {
    return next();
  }
  var refererHost = require('url').parse(referer).host.split(':')[0];
  // 如果静态资源域名与请求地址域名相同就给访问了
  if (refererHost === req.host || whiteList.indexOf(refererHost) !== -1) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'imgs', 'xx.jpg'));
});

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'img.html'));
});

app.listen(8080);
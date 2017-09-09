var uuid = require('uuid/v4');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());
app.use(mySession());
// app.use(session({
//   secret: 'szy20170909',
//   cookie: { maxAge: 60 * 1000 * 30 },
//   resave: true,
//   saveUninitialized: true
// }));

app.get('/', function (req, res) {
  if (req.session.sign) {
    req.session.count = req.session.count + 1;
    res.send('welcome <strong>' + req.session.name + '</strong>, 欢迎你第' + req.session.count + '次登陆。');
  } else {
    req.session.sign = true;
    req.session.name = 'jerry';
    req.session.count = 1;
    res.send('欢迎登陆!');
  }
});

app.listen(8080);

//手写Express session中间件
function mySession() {
  var data = {};
  // 要返回中间件格式的函数
  return function (req, res, next) {
    var id = req.cookies['connect.sid'] || uuid();
    res.cookie('connect.sid', id, {
      maxAge: 10 * 1000
    });
    req.session = data[id] || {};
    // 当响应结束时，要把在处理函数中修改的session保存回data里
    res.on('finish', function() {
      data[id] = req.session;
    });
    next();
  }
}
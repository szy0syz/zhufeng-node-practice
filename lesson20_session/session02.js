var uuid = require('uuid/v4');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());
app.use(mySession());

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
function mySession(options) {
  var data = {};
  options = Object.assign({
    rolling: false,
    resave: true,
    genid: uuid,
    name: 'connect.sid',
    cookie: { maxAge: 60 * 60 * 1000 },
    saveUninitialized: true
  }, options);
  // 要返回中间件格式的函数
  return function (req, res, next) {
    // 如果选项中有自定义id生成函数就用，没有就用uuid/v4
    var id = req.cookies[options.name] || options.genid();
    if (options.resave) {
      res.cookie(options.name, id, options.cookie);
    }
    req.session = data[id] || {};
    // 当响应结束时，要把在处理函数中修改的session保存回data里
    res.on('finish', function () {
      // 仅当res.session有属性或saveUninitialized为true
      if (Object.keys(req.session) > 0 || options.saveUninitialized) {
        data[id] = req.session;
      }
    });
    next();
  }
}
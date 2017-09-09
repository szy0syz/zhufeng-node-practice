var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(cookieParser());
app.use(session({
  secret: 'szy20170909',
  cookie: { maxAge: 60 * 1000 * 30 },
  resave: true,
  saveUninitialized: true
}));

app.get('/', function(req, res) {
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
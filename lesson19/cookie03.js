var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
app.set('views', __dirname);

app.get('/', function (req, res) {
  res.render('index', { title: '请登录' });
});

app.get('/login', function (req, res) {
  res.cookie('username', req.query.username);
  res.cookie('isLogin', 1);
  res.redirect('/user');
});

app.get('/user', function (req, res) {
  if (req.cookies.isLogin === '1') {
    res.end(req.cookies.username);
  } else {
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
  }
});

app.listen(8080);
var express = require('express');
var querystring = require('querystring');
// var cookieParser = require('cookie-parser');

var app = express();

// app.use(cookieParser());
app.use(function (req, res, next) {
  console.log(req.headers.cookie);
  req.cookies = querystring.parse(req.headers.cookie, '; ', '=');
  res.myCookie = myCookie;
  next();
});

app.get('/', function (req, res) {
  if (req.cookies.visited) {
    res.send('欢迎老朋友');
  } else {
    res.myCookie('visited', 1, { path: '/', expires: new Date(Date.now() + 5000) });
    res.send('欢迎新朋友');
  }
});

app.get('/a', function (req, res) {
  if (req.cookies.visited) {
    res.send('欢迎老朋友');
  } else {
    res.cookie('visited', 1, { path: '/a', expires: new Date(Date.now() + 4000) });
    res.send('欢迎新朋友');
  }
});

function myCookie(name, val, options) {
  var opts = options || {};
  var parts = [name + '=' + val];
  if (opts.maxAge) {
    parts.push('Max-Age=' + Number(opts.maxAge));
  }
  if (opts.domain) {
    parts.push('Domain=' + opts.domain);
  }
  if (opts.path) {
    parts.push('Path=' + opts.path);
  }
  if (opts.expires) {
    parts.push('Expires=' + opts.expires.toUTCString());
  }
  if (opts.httpOnly) {
    parts.push('HttpOnly');
  }
  if (opts.secure) {
    parts.push('Secure');
  }
  // 图方便调用哈express封装的额方法
  this.append('Set-Cookie', parts.join('; '));

  return this;
}

app.listen(8080);
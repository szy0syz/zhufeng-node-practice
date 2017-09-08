var express = require('express');
var querystring = require('querystring');
// var cookieParser = require('cookie-parser');

var app = express();

// app.use(cookieParser());
app.use(function (req, res, next) {
  // parse()参数说明: 第二个参数 对象之间分隔符为分号+空格，键值对之间的分隔符为等号
  req.cookies = querystring.parse(req.headers.cookies, '; ', '=');
  req.cookie = cookie;
  next();
});

app.get('/', function (req, res) {
  if (req.cookies.visited) {
    res.send('欢迎老朋友');
  } else {
    res.cookie('visited', 1, { maxAge: 10 * 60 * 1000 });
    res.send('欢迎新朋友');
  }
});

function cookie(name, val, options) {
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
    parts.push('HttpOnly'); // 值有键
  }
  if (opts.secure) {
    parts.push('Secure'); // 值有键
  }
  return parts.join('; ');
}

app.listen(8080);
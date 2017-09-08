var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
// 使用epxress内置的静态资源中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());  // 解析json请求体
app.use(bodyParser.urlencoded({extended: true})); // 解析form表单请求体，extended表示继承node默认querystring解析器
//自己简单手写这个静态资源中间件//
app.use(function(req, res, next) {
  var rs = fs.createReadStream(path.join(__dirname, 'public', req.path));
  rs.on('error', function() {
    next();
  })
  rs.pipe(res);
});
/////////////////////////////

app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
app.set('views', path.join(__dirname, '/views'));
app.get('/', function(req, res) {
  res.render('05', {name: 'jerry', age: 88});
})

app.listen(8088);
var http = require('http');
// var url = require('url');
var path = require('path');
var querystring = require('querystring');
var connect = require('./2.connect');
var articles = {
  1: '第一篇文章的详情',
  2: '第二篇文章的详情',
  3: '第三篇文章的详情'
}

var app = connect();
require('./2.middle')(app);


app.use(function(req, res) {
  if (req.path === '/') {
    res.send('<ul><li><a href="/article?id=1">第一篇</a></li><li><a href="/article?id=2">第二篇</a></li><li><a href="/article?id=3">第三篇</a></li></ul>');
  } else if (req.path === '/article') {
    res.send(articles[req.query.id]);
  } else {
    res.end('404');
  }
})

app.listen(8080, function() {
  console.log('server in running at %d port.' ,8080);
})

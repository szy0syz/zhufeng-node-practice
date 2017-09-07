var express = require('express');
var app = express();

////// express 路由测试

app.get('/list', function (req, res) {
  res.send(req.url);
});

app.post('/list', function (req, res) {
  res.send('post: ' + req.url);
});

app.all('/all', function(req, res) {
  res.send('all method: ' + req.url);
});

app.all('*', function(req, res) {
  res.send('404 - Not Found');
})

app.listen(8080, function() {
  console.log('server is running at %d port.', 8080);
})
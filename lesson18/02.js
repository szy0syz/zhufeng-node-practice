var express = require('express');
var app = express();

////////express 中间件测试

// 中央发100元红包
app.use(function(req, res, next) {
  req.redbag = 100;
  next();
});

// 过到省级关卡时被扣20元
app.use(function(req, res, next) {
  req.redbag -= 20;
  next();
});

// 过到市级关卡时被扣30元
app.use(function(req, res, next) {
  req.redbag -= 30;
  next();
});

// 过到村级关卡时被扣40元
app.use(function(req, res, next) {
  req.redbag -= 40;
  next();
});

app.all('*', function(req, res) {
  res.send('到你手上的红包：￥' + req.redbag + '.00元');
})

app.listen(8080, function() {
  console.log('server is running at %d port.', 8080);
})
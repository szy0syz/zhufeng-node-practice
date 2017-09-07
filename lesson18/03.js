var express = require('express');
var app = express();

////////express 中间件测试

// 中央发100元红包
app.use(function(req, res, next) {
  console.log('终于准备发钱了...');
  req.redbag = 100;
  next();
});

// 过到省级关卡时被扣20元
app.use(function(req, res, next) {
  console.log('通过省级关卡中...');
  req.redbag -= 20;
  next();
});

// 过到市级关卡时被扣30元
app.use(function(req, res, next) {
  console.log('通过市级关卡中...');
  req.redbag -= 30;
  next('红包在市级关卡丢了！');
});

// 过到村级关卡时被扣40元
app.use(function(req, res, next) {
  console.log('通过村级关卡中...');
  req.redbag -= 40;
  next();
});

app.all('*', function(req, res) {
  res.send('到你手上的红包：￥' + req.redbag + '.00元');
})

app.use(function(err, req, res, next) {
  console.log('我是最后一个中间件，专门处理错误的。');
  console.error(err);
  res.send(err);
});

app.listen(8080, function() {
  console.log('server is running at %d port.', 8080);
})
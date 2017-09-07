var express = require('express');
var app = express();

app.get('/detail/:fid/:fname', function(req, res) {
  // req.params 查询路程参数转换后的对象
  res.send(req.params);
  // http://127.0.0.1:8080/detail/204/jerry
  // {"fid":"204","fname":"jerry"}
});

app.listen(8080);
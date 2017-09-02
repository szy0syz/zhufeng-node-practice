var http = require('http');
http.createServer(function (req, res) {
  req.setEncoding('utf8');
  var result = '';
  //因为req和res都是流
  req.on('data', function (data) {
    result += data;
  });
  req.on('end', function (data) {
    console.log('Server:', JSON.parse(result));
    res.end(result);
  })
}).listen(8080, function () {
  console.log('server is running...');
});
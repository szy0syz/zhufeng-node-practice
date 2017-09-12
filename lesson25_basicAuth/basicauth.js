var http = require('http');

http.createServer(function(req, res) {
  var auth = req.headers['authorization'];
  if (auth) {
    var area = auth.slice(6);
    var parts = new Buffer(area, 'base64').toString().split(':');
    if(parts[0] + parts[1] === 'admin123') {
      return res.end('welcome');
    }
    res.setHeader('Content-Type', 'text/plain; charset=utf-8;');
    res.end('认证失败');
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="secure Area"');
    res.writeHead(401);
    return res.end();
  }
}).listen(8080);
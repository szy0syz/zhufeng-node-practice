var fs = require('fs');
var http = require('http');
var crypto = require('crypto');
var express = require('express');

process.chdir(__dirname);

function getHash(str) {
  var shasum = crypto.createHash('sha1');
  return shasum.update(str).digest('base64');
}
/**
 * @param {string} filename 
 * @param {IncomingMessage} req 
 * @param {stream} res 
 */
function send(filename, req, res) {
  // 取得文件最后修改时间
  var ifNoneMAtch = req.headers['if-none-match']; // 注意，服务端取键名要全小写！

  fs.readFile(filename, function (err, data) {
    var sha1 = getHash(data.toString());
    if (sha1 === ifNoneMAtch) {
      res.statusCode = 304;
      res.end();
    } else {
      res.writeHead(200, { 'Etag': sha1, 'Cache-Control': 'max-age=3600' });
      fs.createReadStream(filename).pipe(res);
    }
  })
}

http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    var filename = req.url.slice(1) || 'index.html'; // index.html 不要那个横杠杠
    send(filename, req, res);
  } else {
    res.statusCode = 404;
    res.end('404');
  }
}).listen(8080);
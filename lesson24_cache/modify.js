var fs = require('fs');
var express = require('express');
process.chdir(__dirname);
var http = require('http');

/**
 * 
 * @param {string} filename 
 * @param {IncomingMessage} req 
 * @param {stream} res 
 * 
 * 1. 
 */
function send(filename,req, res) {
  console.log(req.headers['if-modified-since']);
  // 取得文件最后修改时间
  var lastModifiedSince = new Date(req.headers['if-modified-since']); // 注意，服务端取键名要全小写！
  fs.stat(filename, function(err, stat) {
    if(stat.mtime.getTime() === lastModifiedSince.getTime()) {
      // res.sendStatus(304).end(); // 又不是express
      res.statusCode = 304;
      res.end();
    } else {
      res.writeHead(200, {'Last-Modified': stat.mtime.toGMTString()});
      fs.createReadStream(filename).pipe(res);
    }
  })
}

http.createServer(function(req, res) {
  if(req.url !== '/favicon.ico') {
    var filename = req.url.slice(1) || 'index.html'; // index.html 不要那个横杠杠
    send(filename, req, res);
  } else {
    res.statusCode = 404;
    res.end('404');
  }
}).listen(8080);
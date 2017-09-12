var fs = require('fs');
var http = require('http');
var crypto = require('crypto');
var express = require('express');

process.chdir(__dirname);

/**
 * @param {string} filename 
 * @param {IncomingMessage} req 
 * @param {stream} res 
 */
function send(filename,req,res){
  fs.readFile(filename,function(err,data){
      var expires = new Date(Date.now()+ 10*1000);
      res.setHeader('Expires',expires.toUTCString());//设置过期时间
      res.setHeader('Cache-Control','max-age=10');
      res.end(data);
  });
}

http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    console.log(req.url);
    var filename = req.url.slice(1) || 'index.html'; // index.html 不要那个横杠杠
    send(filename, req, res);
  } else {
    res.statusCode = 404;
    res.end('404');
  }
}).listen(8080);
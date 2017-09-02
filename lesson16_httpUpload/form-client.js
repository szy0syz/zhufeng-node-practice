var querystring = require('querystring');
var http = require('http');
var options = {
  hostname: '127.0.0.1',
  port: 8080,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  path: '/',
  method: 'POST'
};
var req = http.request(options, function (res) {
  // res.setEncoding('utf8');
  var result = '';
  //因为req和res都是流
  res.on('data', function(data) {
    result += data;
  });
  res.on('end', function(data) {
     console.log('Client:' ,JSON.stringify(result));
  })
});

req.write(querystring.stringify({ name: 'jerry', age: '18' }));
req.end();

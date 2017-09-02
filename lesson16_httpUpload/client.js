var http = require('http');
var options = {
  hostname: '127.0.0.1',
  port: 8080,
  headers: {
    'Content-Type': 'application/json'
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
     console.log('Client:' ,JSON.parse(result));
  })
});

req.write(JSON.stringify({ name: 'jerry', age: '18' }));
req.end();

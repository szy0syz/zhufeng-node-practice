var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

socket.on('message', function (msg, rinfo) {
  console.log('===client===');
  console.log('msg', msg.toString());
  console.log('rinfo', rinfo);
  console.log('===client===');
});

socket.send(new Buffer('jerry shi'), 0,9,41234,'127.0.0.1', function(err, bytes) {
  console.log('===client===');
  console.log('发送了%d个字节', bytes);
  console.log('===client===');
});
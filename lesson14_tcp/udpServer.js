var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
socket.on('message', function (msg, rinfo) {
  console.log('=====server=====');
  console.log('msg', msg.toString());
  console.log('rinfo', rinfo);
  console.log('=====server=====');
  socket.send(new Buffer('upd_ok'), 0, 12, rinfo.port, rinfo.address);
});
socket.bind(41234, '127.0.0.1');

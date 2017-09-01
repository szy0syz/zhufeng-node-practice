var net = require('net');
var util = require('util');

var socket = new net.Socket({ allowHalfOpen: true });
socket.setEncoding('utf8');
// 连接我们的服务器
socket.connect(8088, 'localhost', function () {
  // 其实了嘛，socket是个双工流，我在这里write，服务端将能read
  socket.write('hello, jerry.');
  // 当服务端write时，客户端readable方向会触发data事件，会接收服务端返回值
  socket.on('data', function(data) {
    console.log(data);
  });
});
var net = require('net');
var util = require('util');

// socket是 双工流 Dyplux
var server = net.createServer(function (socket) {
  console.log(util.inspect(socket.address()));
  // 查看当前连接数量
  server.getConnections(function (err, count) {
    console.log('TCPs:', count);
  });
  // 当收到数据是，打印出来。
  socket.on('data', function (data) {
    console.log('接收数据:', data);
  });
  socket.on('error', function (err) {
    console.log(err);
    socket.destroy();
  })
});

server.on('error', function (err) {
  console.log(err);
});

server.listen(8088, function () {
  console.log(util.inspect(server.address()));
});

server.on('close', function () {
  console.log('server is closed...');
});
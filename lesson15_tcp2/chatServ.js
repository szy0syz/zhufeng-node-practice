/**
 * 1. 创建这么一个服务端：
 * 2. 客户端可以连接服务端
 * 3. 客户端可以发言，然后广播给大家
 * 4. 客户端连接和退出后都要通知大家
 * 5. 显示当前的在线人数
 */

var net = require('net');
var util = require('util');
var clients = {};
var server = net.createServer(function (socket) {
  var nickname;
  socket.setEncoding('utf8');
  socket.write('欢迎光临，请输入用户名：\r\n> ');
  socket.on('data', function (data) {
    data = data.replace(/\r\n/, '');
    if (nickname) {
      broadcast(nickname, nickname + ': ' + data);
    } else {
      nickname = data;
      clients[nickname] = socket;
      broadcast(nickname, '[系统广播]' + nickname + '加入了聊天室! ');
    }
  });
});

function broadcast(nickname, msg) {
  for (var name in clients) {
    if (nickname !== name) {
      clients[name].write(msg + '\r\n');
    }
  }
}

server.listen(8090, function () {
  console.log('Chat-server is running...');
})
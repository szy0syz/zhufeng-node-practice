/** TCP简版聊天室
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
  // 异步方式回去服务器在线人数和欢迎语
  server.getConnections(function (err, count) {
    socket.write('欢迎光临，当前共在线' + count + '，请输入用户名：\r\n> ');
  });

  // 监听socket上可读流方向上的data事件，如果读到来自客户端数据就触发事件 
  socket.on('data', function (data) {
    // 过滤回车换行
    data = data.replace(/\r\n/, '');
    // 如果在当前闭包里，nickname已经有值就说明设置过名称，直接将他输入的内容广播出去
    if (nickname) {
      broadcast(nickname, nickname + ': ' + data);
    // 否则就认为是新用户登录，则设置名称、存储socket、广播新用户到来
    } else {
      nickname = data;
      clients[nickname] = socket;
      broadcast(nickname, '[系统广播]' + nickname + '加入了聊天室! ');
    }
  });

  // 监听end，在流程中end比close先触发
  socket.on('end', function (data) {
    console.log('client is end...');
    broadcast(nickname, '[系统广播]' + nickname + '离开了聊天室! ');
    // 清除socket
    if (clients[nickname]) {
      clients[nickname].destroy();
      delete clients[nickname];
    }
  });

  socket.on('error', function (err) {
    console.log(err);
  });

  // 监听close事件，在end事件后触发，再次确认清除一下客户端的socket
  socket.on('close', function () {
    console.log('client is closed...');
    if (clients[nickname]) {
      clients[nickname].destroy();
      delete clients[nickname];
    }
  });
});

// 广播函数
function broadcast(nickname, msg) {
  for (var name in clients) {
    if (nickname !== name) {
      clients[name].write(msg + '\r\n');
    }
  }
}

// 开启 服务器
server.listen(8090, function () {
  console.log('Chat-server is running...');
})
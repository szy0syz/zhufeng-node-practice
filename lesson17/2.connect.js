var url = require('url');
var http = require('http');

var proto = {};

function createServer() {
  function app(req, res) {
    app.handle(req, res);
  }
  // 把proto对象的属性拷贝到app中一份
  Object.assign(app, proto);
  app.stack = [];
  return app;
}

proto.use = function (route, fn) {
  var handle = fn;
  var path = route;
  // 如果第一个参数不是字符串，那么可能是函数。
  // 那就说明没传路由，直接传业务操作函数
  if (typeof route !== 'string') {
    // 那么就让第一个参数等于handle
    handle = route;
    // 默认为根目录
    path = '/';
  }
  this.stack.push({ handle: handle, path: path });
}

proto.handle = function (req, res) {
  var stack = this.stack;
  var index = 0;
  function next() {
    var layer = stack[index++];
    var route = layer.path;
    var handle = layer.handle;

    var path = url.parse(req.url).pathname;
    // 这里只能startWith，因为还有查询参数之类的
    // 但有个问题，如果是访问根目录/，则所有都匹配上了
    if (path.startsWith(route)) {
      handle(req, res, next);
    } else {
      next();
    }
  }
  next();
}

proto.listen = function (port, callback) {
  var server = http.createServer(this);
  server.listen(port, callback); // app.listen(8080) -> this == app
}

module.exports = createServer;
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
  // 那就说明没传路由，直接传业务操作函数，其实就是404操作之类的
  if (typeof route !== 'string') {
    // 那么就让第一个参数等于handle
    handle = route;
    // 默认为根目录
    path = '/';
  }
  this.stack.push({ handle: handle, path: path });
}

proto.handle = function (req, res) {
  // 就目前而言stack数组里有这些东西
  // [
  //   { 'path': '/', 'handle': '给req上添加query等共有属性的中间件' },
  //   { 'path': '/', 'handle': '给res添加send方法的中间件' },
  //   { 'path': '/', 'handle': '给res添加render方法的中间件' },
  //   { 'path': '/list', 'handle': '路由'},
  //   { 'path': '/article', 'handle': '路由'},
  //   { 'path': '/', 'handle': '最终404路由'},
  // ]
  // 每一个请求，都会进该函数一次，然后递归调用上面这6个中间件
  var stack = this.stack;
  var index = 0;
  function next() {
    var layer = stack[index++];
    var route = layer.path;
    var handle = layer.handle;

    var path = url.parse(req.url).pathname;
    // route = url.parse(route).pathname;
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

// 还是用url模块吧
function routeMatch(path, route) {
  if (path === route) {
    return true;
  } else if (path.slice(1) === (route.slice(1))) {
    return true;
  } else {
    return false;
  }
}

module.exports = createServer;
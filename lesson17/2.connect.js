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

proto.use = function (handle) {
  this.stack.push(handle);
}

proto.handle = function (req, res) {
  var stack = this.stack;
  var index = 0;
  function next() {
    stack[index++](req, res, next);
  }
  next();
}

proto.listen = function (port, callback) {
  console.log(this);
  var server = http.createServer(this); 
  server.listen(port,callback); // app.listen(8080) -> this == app
}

module.exports = createServer;
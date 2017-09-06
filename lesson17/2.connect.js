var http = require('http');
var proto = {};

function createServer() {
  function app(req, res, next) {

  }
  // 把proto对象的属性拷贝到app中一份
  Object.assign(app, proto);
  app.stack = [];
  return app;
}

proto.use = function(handle) {
  this.stack = [];
}

module.exports = createServer;
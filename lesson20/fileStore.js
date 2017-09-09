var fs = require('fs');
var path = require('path');
// 关于如何实现express-session中的抽象接口需要看源码readme
module.exports = function (session) {
  var Store = session.Store;
  function FileStore(options) {

  }
  // 第一版fileStore为内存型
  var data = {};
  // 增长FileStore的原型链
  FileStore.prototype.__proto__ = Store.prototype;
  FileStore.prototype.get = function (sid, callback) {
    callback(null, data[sid]);
  }
  FileStore.prototype.set = function (sid, session, callback) {
    data[sid] = session;
    callback();
  }
  FileStore.prototype.destroy = function (sid, callback) {
    delete data[sid];
    callback();
  }
  return FileStore;
}
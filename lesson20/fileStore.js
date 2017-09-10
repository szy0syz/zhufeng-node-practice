var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

// 关于如何实现express-session中的抽象接口需要看源码readme
module.exports = function (session) {
  var Store = session.Store;
  function FileStore(opts) {
    var options = Object.assign({}, { dir: '.' }, opts);
    this._dir = options.dir;
    mkdirp.sync(this._dir); // 没有就创建
  }
  // 第一版fileStore为内存型
  // var data = {};

  // 拼接FileStore的原型链
  FileStore.prototype.__proto__ = Store.prototype;
  FileStore.prototype.get = function (sid, callback) {
    // callback(null, data[sid]);
    // 第二版：升级为文件型fileStore
    var pathname = path.join(this._dir, sid);
    fs.exists(pathname, function (exists) {
      if (exists) {
        fs.readFile(pathname,{encoding:'utf8'},function(err, data) {
          // 需要以utf8读取后转对象回传
          callback(null, JSON.parse(data));
        })
      } else {
        callback(null,null);
      }
    })
  }
  FileStore.prototype.set = function (sid, session, callback) {
    // data[sid] = session;
    // callback();
    fs.writeFile(path.join(this._dir,sid),JSON.stringify(session),callback)
  }
  FileStore.prototype.destroy = function (sid, callback) {
    // delete data[sid];
    // callback();
    fs.unlink(path.join(this._dir, sid), callback);
  }
  return FileStore;
}
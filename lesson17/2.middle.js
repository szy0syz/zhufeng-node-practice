var url = require('url');

module.exports = function (app) {
    app.use(function (req, res, next) {
        var urlObj = url.parse(req.url, true);
        var pathname = urlObj.pathname;
        var query = urlObj.query;
        // 为方便使用者在req中添加两个属性
        req.path = pathname;
        req.query = query;
        next();
    });

    app.use(function (req, res, next) {
        // 给res添加一个业务方法
        res.send = function (data) {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            res.end(data);
        }
        next();
    });
}
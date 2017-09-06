module.exports = function (app) {
  //////测试数据
  var articles = {
    1: '第一篇文章的详情',
    2: '第二篇文章的详情',
    3: '第三篇文章的详情'
  }
  ////////////

  app.use('/list', function (req, res) {
    res.send('<ul><li><a href="/article?id=1">第一篇</a></li><li><a href="/article?id=2">第二篇</a></li><li><a href="/article?id=3">第三篇</a></li></ul>');
  })

  app.use('/article', function (req, res) {
    res.send(articles[req.query.id]);
  })

  app.use(function (req, res) {
    res.end('404');
  })
}
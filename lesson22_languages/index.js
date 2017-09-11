var express = require('express');
var path = require('path')
var app = express();

// Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2,ja;q=0.2,fr;q=0.2

function checkLanguage(languages) {
  function parse(str) {
    if (!str) {
      return [];
    }
    return str
      .toLowerCase()
      .split(',')
      .map(function (lan) {
        var parts = lan.split(';');
        return { name: parts[0], q: parts[1] || 1 }
      })
      .filter(function (lang) {
        return languages.indexOf(lang.name) !== -1;
      })
      .sort(function (prev, next) {
        return next.q - prev.q;
      })
      .map(function (item) {
        return item.name;
      })
  }
  return function(req, res, next) {
    var acceptLanguages = req.headers['accept-language'];
    console.log('accept-language:',acceptLanguages);
    req.acceptLanguages = parse(acceptLanguages)[0] || languages[0];
    next();
  }
}

app.use(checkLanguage(['zh-CN', 'en']));

app.get('/', function (req, res) {
  res.setHeader('Content-Language', req.acceptLanguages);
  res.sendFile(path.join(__dirname,req.acceptLanguages, 'index.html'));
})

app.listen(8080);
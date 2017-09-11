var express = require('express');
var path = require('path');
var proxy = require('http-proxy').createProxyServer();

// "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36"

var app = express();

function proxyPass(config) {
    return function (req, res) {
        var target = config[req.hostname];
        proxy.web(req, res, {
            target: target
        });
    }
}

app.use(proxyPass({
    'a.szy.com': 'http://localhost:3000',
    'b.szy.com': 'http://localhost:4000'
}));

app.listen(8080);

// a.szy.com
var app3000 = express();
app3000.get('/', function (req, res) {
    res.end('3000');
});
app3000.listen(3000);

// b.szy.com
var app4000 = express();
app4000.get('/', function (req, res) {
    res.end('4000');
});
app4000.listen(4000);
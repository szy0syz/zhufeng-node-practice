var express = require('express');
var path = require('path');
var app = express();

// app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
app.set('views', path.join(__dirname, '/views'));
app.get('/', function(req, res) {
  res.render('05', {name: 'jerry', age: 88});
})

app.listen(8088);
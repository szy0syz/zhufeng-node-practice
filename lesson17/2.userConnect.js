var connect = require('./2.connect');

var app = connect();
require('./2.middle')(app);
require('./2.render')(app);
require('./2.route')(app);

app.listen(8080, function() {
  console.log('server in running at %d port.' ,8080);
})

var fs = require('fs');

// 0  stdin
// 1  stdout
// 2  stderr

setTimeout(function () {
  var buffer = new Buffer(1);
  console.log(buffer);
  // 用fs读stdin
  fs.read(0, buffer, 0, 1, 0, function (err) {
    console.log(buffer);
  })
}, 3000);

// process.stdin.on('data', function (err, data) {
//   console.log(arguments);
// });

setInterval(function () { }, 1000);
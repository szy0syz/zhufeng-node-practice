var net = require('net');
var util = require('util');

var socket = new net.Socket({allowHalfOpen: true});
socket.setEncoding('utf8');

socket.connect(8089, 'localhost', function() {

});
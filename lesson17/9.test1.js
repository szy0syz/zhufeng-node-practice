//express 中间件核心原理demo

function fn1(req, res, next) {
    console.log('fn1', req, res);
    next();
}

function fn2(req, res, next) {
    console.log('fn2', req, res);
    //next();
    next();
}

function fn3(req, res, next) {
    console.log('fn3', req, res);
}


var stack = [fn1, fn2, fn3];
var index = 0;
function next() {
    stack[index++]('123', '456', next);
}
next();
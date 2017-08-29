process.chdir(__dirname);
var Person =  require('./human');
console.dir(require.cache);
// 如果不清楚缓存，require只会加载一次human模块，如果请了后会加载两次！
// delete require.cache[require.resolve('./person')];
var Person =  require('./human');
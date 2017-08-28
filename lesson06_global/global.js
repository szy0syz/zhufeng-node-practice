// console.log('123');
// 其实consoloe.log()在node里就是stdout.write的一个子节点
process.stdout.write('hello');
process.stdin.on('data', function(data) {
  console.log(data.toString());
})
process.chdir(__dirname);
console.log(process.cwd());
var Person =  require('./human');
var boy = new Person('阿大', 28);
var gril = new Person('阿二', 19);
console.log(boy.getName(), boy.getAge());
console.log(gril.getName(), gril.getAge());
console.log(boy.home, gril.home);
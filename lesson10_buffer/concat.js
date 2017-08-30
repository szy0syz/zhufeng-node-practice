function myConcat(list, len) {
  var b = new Buffer(len), i, j, counter = 0;
  for (i = 0; i < list.length; i++) {
    for (j = 0; j < list[i].length; j++) {
      if (counter >= len) {
        return b;
      }
      b[counter++] = list[i][j];
    }
  }
  return b;
}

var buff1 = new Buffer('振宇');
var buff2 = new Buffer('集团');

var buff = myConcat([buff1, buff2], 12);

console.log(buff.toString());
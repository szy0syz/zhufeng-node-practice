var gulp = require('gulp');

// 顺序执行目标任务
gulp.task('1', function() {
  console.log('task 1...');
});

gulp.task('2', function() {
  console.log('task 2...');
});

gulp.task('3', function() {
  console.log('task 3...');
});

gulp.task('default', ['1', '2', '3']);
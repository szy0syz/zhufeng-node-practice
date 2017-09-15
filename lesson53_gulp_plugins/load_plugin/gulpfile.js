var fs = require('fs');
var gulp = require('gulp');
process.chdir(__dirname);
var $ = load();

function load() {
  var devDeps = JSON.parse(fs.readFileSync('package.json'))['devDependencies'];
  var $ = {};
  for (var attr in devDeps) {
    if (attr.indexOf('gulp-') === 0) {
      $[attr.slice(5)] = require(attr);
    }
  }
  return $;
}

gulp.task('default', function() {
  gulp.src('app/*.js')
      .pipe($.concat('all.js')) // 因为是合并文件，必须制定新文件的名字
      .pipe(gulp.dest('dest'));
});


var gulp = require('gulp')
var shell = require('gulp-shell')

gulp.task('build', shell.task([
  'cd build && node build.js -l 0 -o output/playcanvas-latest.js',
  'cd build && node build.js -l 1 -o output/playcanvas-latest.min.js',
  'cd build && node build.js -l 0 -d -o output/playcanvas-latest.dbg.js'
]))

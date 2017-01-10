var gulp = require('gulp')
var shell = require('gulp-shell')
var concat = require('gulp-concat');

gulp.task('build', shell.task([
  'cd build && node build.js -l 0 -o output/playcanvas-latest.js',
  'cd build && node build.js -l 1 -o output/playcanvas-latest.min.js',
  'cd build && node build.js -l 0 -d -o output/playcanvas-latest.dbg.js'
]))

// Tasks to bundle ammo and playcanvas
gulp.task('js', function() {
  return gulp.src([
    'build/dependencies.js',
    'build/output/playcanvas-latest.js'
  ])
  .pipe(concat('ammo-playcanvas.js'))
	.pipe(gulp.dest('build/output'))
});

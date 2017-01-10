var gulp = require('gulp')
var shell = require('gulp-shell')

var watchify = require('watchify');
var browserify = require('browserify');
var assign = require('lodash.assign');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', shell.task([
  'cd build && node build.js -l 0 -o output/playcanvas-latest.js',
  'cd build && node build.js -l 1 -o output/playcanvas-latest.min.js',
  'cd build && node build.js -l 0 -d -o output/playcanvas-latest.dbg.js'
]))

// add custom browserify options here
var customOpts = {
  entries: [
    'node_modules/ammo.js/builds/ammo.js',
    'build/output/playcanvas-latest.min.js',
  ],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('js', bundle);
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('build/'));
}

gulp.task('default', ['build', 'js'])

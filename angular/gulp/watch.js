'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

gulp.task('watch', gulp.series('scripts:watch', 'inject', function watch(cb) {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], gulp.series('inject-reload'));

  gulp.watch([
    path.join(conf.paths.src, '/app/**/*.css'),
    path.join(conf.paths.src, '/app/**/*.scss')
  ])
    .on('change', gulp.series('styles-reload'))
    .on('add', gulp.series('inject-reload'))
    .on('unlink', gulp.series('inject-reload'));

  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'))
    .on('all', function reloadhtml(event) {
      return  browserSync.reload(event.path);
    });

  cb();
}));

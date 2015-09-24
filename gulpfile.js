/*global require:true */
(function () {
  'use strict';
  var gulp = require('gulp');
  var uglify = require('gulp-uglify');
  var jshint = require('gulp-jshint');
  var concat = require('gulp-concat');
  var minifyCSS = require('gulp-minify-css');
  var arenitesrc = require('gulp-arenite-src');
  var shell = require('gulp-shell');

  var build = 'build/';

  gulp.task('docs', function () {
    return gulp.src('js/**/*.js', {read: false})
      .pipe(shell('node_modules/docco/bin/docco -o docs js/**/*.js'));
  });

  gulp.task('min', function () {
    arenitesrc({
        mode: 'dev',
        base: './'
      },
      {
        export: 'arenite',
        imports: [
          {
            url: 'module.js',
            namespace: 'Module.Test'
          }
        ]
      }, function (src) {
        src
          .pipe(concat('test.min.js'))
          .pipe(uglify({preserveComments: 'some'}))
          .pipe(gulp.dest(build));
      });
  });

  gulp.task('js', function () {
    return gulp.src(['js/**.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(concat('test.js'))
      .pipe(gulp.dest(build));
  });

  gulp.task('css', function () {
    gulp.src('css/**/*.css')
      .pipe(concat('test.min.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest(build));
  });


  gulp.task('default', ['min', 'js', 'css', 'docs']);

  gulp.task('watch', function () {
    gulp.watch(['module.js', 'js/**/*.js'], ['min', 'docs']);
  });
}());

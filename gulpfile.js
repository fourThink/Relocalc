var gulp = require('gulp');
//var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

/**
 *  nodemon to keep the server going and run tasks
 */

gulp.task('start', function () {
  nodemon({ script: './server/index.js',
    ext: 'html js css',
    tasks: ['lint', 'sass'],
  })
  .on('restart', function () {
     console.log('restarted!')
  })
})

/**
 *  compiles sass files into css
 */

gulp.task('sass', function () {
  gulp.src('./client/public/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./client/public/'));
});

/**
 *  logs jshint warnings
 */

gulp.task('lint', function() {
  return gulp.src(['client/**/**/*', 'server/*'])
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish));
});

gulp.task('test', ['lint']);
gulp.task('default', ['lint', 'sass']);

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
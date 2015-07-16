var gulp = require('gulp');
var gutil = require('gulp-util');
//vinyle source needed becasuee browserify uses chunks while gulp uses streams
var source = require('vinyl-source-stream');
var browserify = require('browserify');
//reruns gulp files after changes
var watchify = require('watchify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var map = require('map-stream');

/**
 * Notifies you of error lines and types with desktop message
 * @param error
 */

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

/**
 *  bundler object configures build with browserify
 */

var bundler = watchify(browserify({
  //file that kicks off app
  entries: ['./client/app/index.js'],
  extensions: ['.js'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle() {
  return bundler
      .bundle()
      .on('error', notify)
      //combines all files here
      .pipe(source('main.js'))
      .pipe(gulp.dest('./build'))
}
bundler.on('update', bundle)

gulp.task('build', function() {
  bundle()
});

gulp.task('serve', function(done) {
  gulp.src('')
      .pipe(server({
        livereload: {
          enable: true,
          filter: function(filePath, cb) {
            if(/main.js/.test(filePath)) {
              cb(true)
            } else if(/style.css/.test(filePath)){
              cb(true)
            }
          }
        },
        open: true
      }));
});

/**
 *  compiles sass files into css
 */

gulp.task('sass', function () {
  gulp.src('/client/public/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('style.css'))
      .pipe(gulp.dest('./'));
});

/**
 *  formats and logs jshint warnings
 */

var reporter = map(function (file, cb) {
  if (!file.jshint.success) {
    console.log('JSHINT fail in '+file.path);
    file.jshint.results.forEach(function (err) {
      if (err) {
        console.log(' '+file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
      }
    });
  }
  cb(null, file);
});

gulp.task('lint', function() {
  return gulp.src(['client/**/**/*', 'server/*'])
      .pipe(jshint())
      .pipe(reporter);
});

gulp.task('test', ['lint']);
gulp.task('default', ['lint', 'build', 'serve', 'sass', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
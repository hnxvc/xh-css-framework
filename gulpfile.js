'user strict';

var gulp = require('gulp');
var config = require('./gulpconfig')();
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins({pattern: '*'});

// handle error
var onError = function(err) {
  $.notify.onError({
    title: 'CLGT ?' + err.plugin,
    message: err.toString()
  })(err);
};

// compress image
gulp.task('compress-image', function() {
  return gulp.src(config.img)
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true,
      use: [$.imageminPngquant()]
    }))
    .pipe(gulp.dest(config.build_img));
});

// compile styles
gulp.task('styles', function() {
  return gulp.src(config.scss)
    .pipe($.sourcemaps.init())
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.sass({outputStyle: 'expanded'}).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 3 versions'], cascade: true}))
    .pipe(gulp.dest(config.build_scss))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.cleanCss())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.build_scss))
    .pipe($.browserSync.stream());
});


// default
gulp.task('default', [
  'styles'
], function() {
  console.log('everything ok :) !');
});

// watch all
gulp.task('watch-all', function() {
  gulp.watch(config.scss, ['styles']);
});

// browser sync
gulp.task('serve', ['default'], function() {

  $.browserSync({
    server: {
      baseDir: config.base
      // index: "index.html",
    }
  });

  gulp.watch(config.base + '*.html').on('change', $.browserSync.reload);
  gulp.watch(config.base + 'demo/*.html').on('change', $.browserSync.reload);
  gulp.watch(config.scss, ['styles']);
  gulp.watch(config.base + '/build/css/styles.min.css').on('change', $.browserSync.reload);

});

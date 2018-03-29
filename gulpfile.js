// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    minifycss = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    del = require('del'),
    replace = require('gulp-replace');

global.buildPath = './dist';
global.srcPath = './scss';
global.AUTOPREFIXER_BROWSERS = {
    browsers: ['>1%'],
    map: false,
    flexbox: 'no-2009'
}

// -----------------------------------------
// STYLES
// -----------------------------------------
gulp.task('styles', function() {

  return gulp.src(`${global.srcPath}/etsubucs-master.scss`)
    .pipe(sass())
      .on('error', err => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(postcss([ autoprefixer(global.AUTOPREFIXER_BROWSERS) ]))
      .on('error', err => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(replace('@charset "UTF-8";','')) // reddit does not like charset
      .on('error', err => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(`${global.buildPath}`))
      .on('error', err => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename({ suffix: '.min' }))
      .on('error', err => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(minifycss({autoprefixer: false}))
      .on('error', err => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(`${global.buildPath}`))
      .on('error', err => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(notify({ message: 'Styles task complete' }));
});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles');
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('scss/**/*.scss', ['styles']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    //gulp.watch(['dist/**']).on('change', livereload.changed);

});

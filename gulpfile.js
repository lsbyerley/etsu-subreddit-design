// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    replace = require('gulp-replace');

// Styles
gulp.task('styles', function() {
    return sass('scss/etsubucs-master.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(replace('@charset "UTF-8";','')) // reddit does not like charset
        .pipe(gulp.dest('dist'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist'))
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
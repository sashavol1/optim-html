"use sctrict";

var gulp = require("gulp"),
		connect = require("gulp-connect"),
    concatCss = require('gulp-concat-css'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
		opn = require("opn");

// Запускаем локальный сервер
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
  opn('http://localhost:8888');
});

//LESS compiler
gulp.task('less', function () {
  gulp.src('app/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/css/'));
});

// Работа с HTML
gulp.task('html', function () {
  gulp.src('app/*.html')
    .pipe(connect.reload());
});

// Работа с CSS
gulp.task('css', function () {
  gulp.src('app/css/*.css')
  .pipe(concatCss("concat.css"))
  .pipe(minifyCss(""))
   .pipe(rename("concat.min.css"))
   .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

// Работа с JS
gulp.task('js', function () {
  gulp.src('app/js/*.js')
    .pipe(connect.reload());
});

// Слежка
gulp.task('watch', function () {
  gulp.watch(['app/*.html'], ['html']);
  gulp.watch(['app/js/*.js'], ['js']);
  gulp.watch(['app/css/*.css'], ['css']);
  gulp.watch(['app/less/*.less'], ['less']);
});

// Задача по-умолчанию
gulp.task('default', ['connect', 'watch']);
var gulp = require('gulp');
var tsc = require('gulp-typescript');
var uglify = require('gulp-uglify');
var cssMinify = require('gulp-minify-css');
var concat = require('gulp-concat');

var tscProject = tsc.createProject({
	declarationFiles: false,
	noExternalResolve: false,
	module: 'amd'
});

gulp.task('html', function() {
	return gulp.src('src/*.html')
	           .pipe(gulp.dest('release'));
});

gulp.task('assets', function() {
	return gulp.src('src/Assets/**/*.*')
	           .pipe(gulp.dest('release/Content'));
});

gulp.task('css', function() {
	return gulp.src('src/Styles/*.css')
	           .pipe(concat('style.css'))
	           .pipe(gulp.dest('release/Content'));
});

gulp.task('js', function() {
	return gulp.src('src/Scripts/*.js')
	           .pipe(uglify())
	           .pipe(gulp.dest('release/Scripts'));
});

gulp.task('tsc', function() {
	return gulp.src('src/Scripts/*.ts')
	           .pipe(tsc(tscProject)).js
	           .pipe(uglify())
	           .pipe(gulp.dest('release/Scripts'));
});

gulp.task('default', ['html', 'assets', 'css', 'js', 'tsc']);
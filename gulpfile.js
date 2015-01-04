var gulp = require('gulp');
var tsc = require('gulp-typescript');
var uglify = require('gulp-uglify');
var cssMinify = require('gulp-minify-css');
var concat = require('gulp-concat');
var streamqueue = require('streamqueue');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var tscProject = tsc.createProject({
	declarationFiles: false,
	noExternalResolve: false,
	module: 'amd',
	target: 'ES5',
	noImplicitAny: true
});

var map = function(arr, source, ext) {
	return arr.map(function(element) {
		return source + '/' + element + ext;
	});
};

var mapall = function(obj, source, ext) {
	var dirs = Object.keys(obj);
	var all = [];

	for (var i = 0; i < dirs.length; ++i) {
		var dir = dirs[i];
		var files = obj[dir];
		all = all.concat(map(files, source + dir, ext));
	}

	return all;
};

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
	return gulp.src('src/Scripts/lib/*.js')
	           .pipe(uglify())
	           .pipe(gulp.dest('release/Scripts'));
});

gulp.task('tsc', function() {
	var baseDir = 'src/Scripts/';
	var files = mapall({
		engine  : ['main', 'constants', 'Base', 'Gauge', 'Level'],
		matter  : ['Matter', 'Decoration', 'Ground', '*'],
		figures : ['Figure', 'Hero', 'Enemy', 'Turtle', 'Plant', '*'],
		items   : ['Item', 'Coin', 'ItemFigure', 'CoinBox', '*'],
	}, baseDir, '.ts');

	return streamqueue({ objectMode: true },
					gulp.src(files).pipe(concat('../main.ts')),
					gulp.src(baseDir + '*.ts'))
	           .pipe(tsc(tscProject)).js
	           .pipe(uglify())
	           .pipe(rename({ dirname: '.' }))
	           .pipe(gulp.dest('release/Scripts'));
});

gulp.task('clean', function() {
	return gulp.src('release', {read: false})
	           .pipe(clean());	
});

gulp.task('default', ['html', 'assets', 'css', 'js', 'tsc']);
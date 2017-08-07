//define components
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	livereload = require('gulp-livereload'),
	rename = require('gulp-rename'),

	//css processing
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	precss = require('precss'),
	stylus = require('gulp-stylus'),

	//js processing
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),

	//define directories
	out = 'wp/wp-content/themes/_custom'

//copy media
gulp.task('mediaCp', function() {
	gulp.src('dev/!(_common)**/**/*.{png,jpg,svg}')
		.pipe(rename({dirname:''}))
		.pipe(gulp.dest(out + '/m'));
	gulp.src('dev/_common/**/*.{png,jpg,svg}')
		.pipe(rename({dirname:''}))
		.pipe(gulp.dest(out))
		.pipe(livereload());
});

//copy php
gulp.task('tplCp', function() {
	gulp.src('dev/**/*.{php,tpl,html}')
		.pipe(rename({dirname:''}))
		.pipe(gulp.dest(out))
		.pipe(livereload());
});

//compile SASS synthax / minify
	gulp.task('cssPrep', function() {
		gulp.src('dev/_common/style.styl')
			.pipe(stylus())
			.pipe(postcss([
				precss(),
				autoprefixer(),
				cssnano()
		]))
		.on('error', gutil.log)
		.pipe(gulp.dest(out))
		.pipe(livereload());
	});

	//concatinate & minify & rename javascript
	gulp.task('jsConcat', function(){
		gulp.src([
			'dev/**/!(assembly)*.js',
			'dev/_common/assembly.js'
		])
			.pipe(concat('script.js'))
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(out + '/j'))
			.pipe(livereload());
	});

	//watch & process
	gulp.task('watch', function() {
		livereload.listen();
		gulp.watch('dev/*/**.{png,jpg,svg}', ['mediaCp']);
		gulp.watch('dev/**/*.{php,tpl,html}', ['tplCp']);
		gulp.watch('dev/**/*.css', ['cssPrep']);
		gulp.watch('dev/**/*.js', ['jsConcat']);
	});

gulp.task( 'default', [ 'mediaCp', 'tplCp', 'cssPrep', 'jsConcat', 'watch' ] );
//gulp.task( 'default', [ 'tplCp', 'cssPrep', 'jsConcat', 'watch' ] );

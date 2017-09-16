//define components
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	livereload = require('gulp-livereload'),
	rename = require('gulp-rename'),

	//tpl processing
	pug = require('gulp-pug'),

	//css processing
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	stylus = require('gulp-stylus'),

	//js processing
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),

	//define directories
	out = 'wp/wp-content/themes/_custom'

//copy media
gulp.task('mediaCp', function() {
	gulp.src([
		'dev/!(_common)**/**/*.{png,jpg,svg}'
	])
		.pipe(rename({dirname:''}))
		.pipe(gulp.dest(out + '/m'));
	gulp.src('dev/_common/**/*.{png,jpg,svg}')
		.pipe(rename({dirname:''}))
		.pipe(gulp.dest(out));
	gulp.src('dev/_common/**/*.{ttf,otf,eot}')
		.pipe(rename({dirname:''}))
		.pipe(gulp.dest(out + '/f'))
		.pipe(livereload());
});

//prepare PUG
gulp.task('tplPrep', function() {
	gulp.src([
		"!dev/**/inc/*.{html,tpl,php}",
		'dev/**/*.{html,tpl,php}'
	])
		.pipe(rename({dirname:''}))
		.pipe(gulp.dest(out))
	gulp.src([
		"!dev/**/inc/*.pug",
		'dev/**/*.pug'
	])
		.pipe(pug())
		.pipe(rename({dirname:''}))
		.pipe(rename({extname:'.php'}))
		.pipe(gulp.dest(out))
		.pipe(livereload());
});

//prepare CSS
	gulp.task('cssPrep', function() {
		gulp.src([
			"!dev/**/inc/*.styl",
			"dev/**/!(_)*.styl",
		])
			.pipe(stylus())
			.pipe(postcss([
				autoprefixer(),
				cssnano()
		]))
		.on('error', gutil.log)
		.pipe(rename({
			dirname:''
		}))
		.pipe(gulp.dest(out))
		.pipe(livereload());
	});

	//prepare javascript
	gulp.task('jsPrep', function(){
		gulp.src([
			'dev/**/*.js',
			'!dev/**/inc/*.js',
			'dev/**/_!(script)*.js',
			'dev/_common/_script.js'
		])
			.pipe(concat('script.js'))
			.pipe(uglify())
			.pipe(rename({
				dirname:'',
				suffix: '.min',
				extname: '.js'
			}))
			.pipe(gulp.dest(out + '/j'));

		gulp.src([
			'dev/**/*.js',
			'!dev/**/inc/*.js',
			'!dev/**/_*.js'
		])
			.pipe(uglify())
			.pipe(rename({
				dirname:'',
				suffix: '.min'
			}))
			.pipe(gulp.dest(out + '/j'))
			.pipe(livereload());
	});

	//watch & process
	gulp.task('watch', function() {
		livereload.listen();
		gulp.watch('dev/*/**.{png,jpg,svg}', ['mediaCp']);
		gulp.watch('dev/**/*.{html,php,tpl,pug}', ['tplPrep']);
		gulp.watch('dev/**/*.styl', ['cssPrep']);
		gulp.watch('dev/**/*.js', ['jsPrep']);
//		gulp.watch('dev/**/*.include', ["liveReload"]);
	});

gulp.task( 'default', [ 'mediaCp', 'tplPrep', 'cssPrep', 'jsPrep', 'watch' ] );

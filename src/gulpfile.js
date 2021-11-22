const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const babelify = require('babelify');
// const uglify = require('gulp-uglify');

sass.compiler = require('sass');

const taskPug = () => {
	return (
		gulp
			.src([
				'./pug/pages/**/*.pug'
			])
			.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
			.pipe(pug({
				pretty: true,
				basedir: './pug'
			}))
			.pipe(gulp.dest('../dist/'))
	);
};

const taskSass = () => {
	return (
		gulp
			.src([
				'./scss/*.scss',
				// './scss/common/*.scss',
				// './scss/**/style.scss',
				// './scss/**/*.scss',
				// '!' + './scss/**/bk.*.scss'
			])
			.pipe(sass({
				outputStyle: 'compressed'
			}))
			.pipe(gulp.dest('../dist/assets/css'))
	);
};

const taskBrowserify = () => {
	return (
		gulp.src([
			'./js/**/*.js',
			'!' + './js/modules/*.js'
		])
			.pipe(browserify({
				debug: false,
				transform: ['babelify'],
			}))
			// .pipe(uglify())
			.pipe(gulp.dest('../dist/assets/js'))
	)
}

const taskReload = (done) => {
  browserSync.reload();
  done();
};

const taskWatchPug = () => {
	gulp.watch([
		'./pug/**/*.pug'
	], gulp.series(taskPug, taskReload));
};

const taskWatchSass = () => {
	gulp.watch([
		'./scss/**/*.scss'
	], gulp.series(taskSass, taskReload));
};

const taskWatchBrowserify = () => {
	gulp.watch([
		'./js/**/*.js'
	], gulp.series(taskBrowserify, taskReload));
};

const taskServerStart = () => {
	browserSync.init({
		server: {
			baseDir: '../dist/'
		},
		port: 8989,
		notify: false
	});
};

//gulp.task('default', gulp.task('bundle'));
exports.watch = gulp.parallel(taskServerStart, taskWatchSass, taskWatchPug, taskWatchBrowserify);
exports.default = gulp.series(
	gulp.parallel(taskPug, taskSass, taskBrowserify)
);


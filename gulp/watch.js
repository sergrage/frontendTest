const { src, dest, series } = require('gulp'); // подключаем ГУЛП 
// let gulp = require('gulp'); // подключаем ГУЛП 
const watch = require('gulp-watch');
// переменные можно писать и через запятую

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const webpack = require('webpack');

// задание по умолчанию - пренимает два аргумента - ИМЯ и тот код что надо выполнить
//gulp.task('default', function(){
//	console.log("hello");
//});

function html () {
	browserSync.reload();
}

function scss () {
	return src('./app/assets/scss/styles.scss')
	.pipe(sass({outputStyle: 'compressed', includePaths: ['node_modules']}).on('error', sass.logError))
	.pipe(autoprefixer({
            cascade: false
        }))
	.pipe(dest('./app/temp/styles'))
	.pipe(browserSync.stream());
}


// добавив error, stats мы сможем увидеть статистику и ошибки в окне сГУЛП Ватч
function js () {
	webpack(require('./webpack.config.js'), function (error, stats){
		if(error){
			console.log(error.toString());
		}
		console.log(stats.toString());

		browserSync.reload();
	});
}



function watchFiles(){
	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});
	watch('./app/index.html', html);
	watch('./app/assets/js/**/*.js', js);
	watch('./app/assets/scss/**/*.scss', scss);
};


//exports.html = html;
exports.watchFiles = watchFiles; // объявление задания watchFiles


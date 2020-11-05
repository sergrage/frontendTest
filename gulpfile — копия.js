const { src, dest, series, start } = require('gulp'); // подключаем ГУЛП 
// let gulp = require('gulp'); // подключаем ГУЛП 
const watch = require('gulp-watch');
// переменные можно писать и через запятую

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const del = require('del');
const rename = require("gulp-rename");
const replace = require('replace-in-file');
const fs = require('fs');

const webpack = require('webpack');

const optionsReplace = {
  files: './build/index.html',
  from: [/<link rel="stylesheet" href=".\/temp\/styles\/styles.css">/g, /<script src=".\/temp\/js\/App.js"><\/script>/g ],
  to: ['<link rel="stylesheet" href="./assets/styles/styles.css">', '<script src="assets/js/App.js"></script>' ]
};

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


function imgOpt() {
	return src('./app/assets/img/*')
		.pipe(imagemin())
		.pipe(dest('./build/assets/img'));
}

function deleteBuild() {
	return del('./build/**');
}

function version(){
//	return src('app/temp/styles/style.css')
//	.pipe(rename('style2.css'))
//	.pipe(dest('build/styles'));
let name = './app/temp/styles/styles1.css?'+Date.now();
console.log(name);
	fs.rename('./app/temp/styles/styles.css', name , function(err) {
	    if ( err ) console.log('ERROR: ' + err);
	});
}

function htlmMin() {
	return src('./app/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('./build'));
}

function htmlReplacePath(cb) {
	try {
	  const results = replace.sync(optionsReplace);
	  console.log('Replacement results:', results);
	}
	catch (error) {
	  console.error('Error occurred:', error);
	}
	cb(); // https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
}

function copyRes() {
	return src('./app/temp/**/*')
		.pipe(dest('./build/assets/'));
}

function copyFonts() {
	return src( './app/assets/fonts/*' )
		.pipe(dest('./build/assets/fonts/'));
}


function build(cb) {
	cb(); // https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
	// тут явно надо дать понять ГУЛП, чт офункция закончилась. Используем коллбек функцию.
}


//function cssInject(){
//	return src('./app/temp/styles')
//	.pipe(browserSync.stream());
//};

//exports.html = html;
exports.watchFiles = watchFiles; // объявление задания watchFiles

exports.build = series(deleteBuild, htlmMin, htmlReplacePath, imgOpt, copyRes, copyFonts); // объявление задания watchFiles

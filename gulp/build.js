const { src, dest, series } = require('gulp'); // подключаем ГУЛП 
// let gulp = require('gulp'); // подключаем ГУЛП 


const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const del = require('del');
const rename = require("gulp-rename");
const replace = require('replace-in-file');
const rev = require('gulp-rev');
// const fs = require('fs');

const webpack = require('webpack');

const optionsReplaceHtml = {
  files: './build/index.html',
  from: [/<link rel="stylesheet" href=".\/temp\/styles\/styles.css">/g, /<script src=".\/temp\/js\/App.js"><\/script>/g ],
  to: ['<link rel="stylesheet" href="./assets/styles/styles.css?v='+ Date.now() +'">', '<script src="assets/js/App.js?v='+Date.now()+'"></script>' ]
};
const optionsReplaceCss = {
  files: './build/assets/styles/styles.css',
  from: [/\/assets\/fonts\/OpenSans/g, /\/assets\/img\/parallax-1110/g],
  to: ['../fonts/OpenSans', '../img/parallax-1110']
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
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest('./build'));
}

function jsMin() {
	return src('./app/temp/js/App.js')
    .pipe(uglify())
    .pipe(dest('./build/assets/js'));
}

function htmlReplace(cb) {
	try {
	  const results = replace.sync(optionsReplaceHtml);
	  console.log('Replacement results:', results);
	}
	catch (error) {
	  console.error('Error occurred:', error);
	}
	cb(); // https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
}

function cssReplace(cb) {
	try {
	  const results = replace.sync(optionsReplaceCss);
	  console.log('Replacement results:', results);
	}
	catch (error) {
	  console.error('Error occurred:', error);
	}
	cb(); // https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
}

function copyRes() {
	return src(['./app/temp/styles/**/*', './app/temp/webfonts/**/*'],  {base: './app/temp/'})
		.pipe(dest('./build/assets/'));
}

function copyFonts() {
	return src( './app/assets/fonts/*' )
		.pipe(dest('./build/assets/fonts/'));
}

function copyFavicon() {
	return src( './app/favicon.jpg' )
		.pipe(dest('./build'));
}

//function build(cb) {
//	cb(); // https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
	// тут явно надо дать понять ГУЛП, чт офункция закончилась. Используем коллбек функцию.
//}


exports.build = series(deleteBuild, htlmMin, htmlReplace, jsMin, copyFonts, copyRes, cssReplace, imgOpt, copyFavicon); // объявление задания watchFiles

 
// 1. Очистка папки build
// 2. Копируем index.html в корень папки build и минимизируем файл
// 3. Замена в index.html двух строчек: подключение стилей, подключение скриптов + версионирование
// 4. Копируем скрипты и минимизируем файл
// 5. Копируем папку fonts в папку build/assets/
// 6. Копируем папки './app/temp/styles/**/*', './app/temp/webfonts/**/*' в build/assets/
// 7. Замена в styles.css путей для шрифтов 
// 8. Копируем папку img в папку build/assets/ и минимизируем фотографии
// 9. Копируем favicon.jpg в папку build
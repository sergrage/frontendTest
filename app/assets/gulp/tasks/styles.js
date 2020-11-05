const { src, dest } = require('gulp'); // подключаем ГУЛП 
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function scss () {
	return src('./app/dev/scss/styles.scss')
	.pipe(sass({outputStyle: 'compressed', includePaths: ['node_modules']}).on('error', sass.logError))
	.pipe(autoprefixer({
            cascade: false
        }))
	.pipe(dest('./app/temp/styles'))
	.pipe(browserSync.stream());
}
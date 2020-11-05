let watch = require('gulp-watch');
const browserSync = require('browser-sync').create();


function html () {
	browserSync.reload();
}

function watchFiles(){
	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});
	watch('./app/index.html', html);
	watch('./app/dev/scss/**/*.scss', scss);
};
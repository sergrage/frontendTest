let watchTask = require('./gulp/watch');
let buildTask = require('./gulp/build');

exports.watchFiles = watchTask.watchFiles;
exports.build = buildTask.build;

function defaultTask() {
  // place code for your default task here
  console.log(123);
}

exports.default = defaultTask
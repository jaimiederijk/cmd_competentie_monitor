var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;

function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
}

gulp.task('start-mongo', runCommand('mongod --dbpath H:/mongodb/data/'));
gulp.task('empty-collection', runCommand('mongo monitor --eval "db.forms.remove({})"'));

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js html ejs'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default', ['start-mongo','start']);

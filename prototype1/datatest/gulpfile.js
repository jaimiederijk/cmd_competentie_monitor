var gulp = require('gulp');
var exec = require('child_process').exec;
var mkdirs = require('mkdirs');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon')

function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
}

gulp.task('create-data-folder', function() {
  mkdirs('./mongodb/data');
});

//https://stackoverflow.com/questions/28665395/using-gulp-to-manage-opening-and-closing-mongodb

gulp.task('start-mongo', runCommand('mongod --dbpath ./mongodb/data/'));
gulp.task('stop-mongo', runCommand('mongo --eval "use admin; db.shutdownServer();"'));
gulp.task('create-db', runCommand('mongo compmonitor --eval "db.getCollectionNames()"'));
gulp.task('import-data', runCommand('mongoimport --db compmonitor --collection formelements --drop --file ./sensorseed.json'));
gulp.task('import-data2', runCommand('mongoimport --db compmonitor --collection settings --drop --file ./settingsseed.json'));
gulp.task('drop-collection', runCommand('mongo compmonitor --eval "db.sensors.drop()"'));

// gulp.task('import-data-live', runCommand('mongoimport --host "tauw-shard-00-00-rkjng.mongodb.net:27017,tauw-shard-00-01-rkjng.mongodb.net:27017,tauw-shard-00-02-rkjng.mongodb.net:27017" --authenticationDatabase admin --ssl --username jaimie2 --password tauw22 --db tauw --collection sensors --drop  --jsonArray --file "./generated.json"'));

// gulp.task('import-settings-live', runCommand('mongoimport --host "tauw-shard-00-00-rkjng.mongodb.net:27017,tauw-shard-00-01-rkjng.mongodb.net:27017,tauw-shard-00-02-rkjng.mongodb.net:27017" --authenticationDatabase admin --ssl --username jaimie2 --password tauw22 --db tauw --collection settings --drop --file "./settingsseed.json"'));

gulp.task('setup-db',['create-data-folder','start-mongo','create-db', 'import-data2']);

gulp.task('sass', function() {
    return gulp.src('public/stylesheets/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/build/css'));
});

gulp.task('scripts', function() {
    gulp.src('public/javascripts/main.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(rename('build.js'))
        .pipe(gulp.dest('public/build/js/'))
});

gulp.task('watch', function() {
    gulp.watch('public/stylesheets/*.scss', ['sass']);
    gulp.watch('public/javascripts/*.js', ['scripts']);
});

gulp.task('start', function () {
  nodemon({
    script: 'bin/www'
  , ext: 'js html ejs'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('start-live', function () {
  nodemon({
    script: 'bin/www'
  , ext: 'js html ejs'
  , env: { 'NODE_ENV': 'development' }
  })
})
gulp.task('live',['start-live']);

gulp.task('default', ['sass','scripts','start-mongo', 'watch','start']);

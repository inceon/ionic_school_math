var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var bytediff = require('gulp-bytediff');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  sass: ['./scss/ionic.app.scss',
        './www/style/main.scss',
        './www/views/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('minify_css', function(done){
    gulp.src('./www/css/ionic.app.css')
        .pipe(cleanCSS())
        .pipe(rename('ionic.app.min.css'))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('minify_js', function(done){
    gulp.src(['./www/**/*.js', '!./www/lib/**/*.*'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./www/'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./www/'))
        .on('end', done);
});

gulp.task('js', function() {
    return gulp.src(['./www/**/*.js', '!./www/lib/**/*.*'])
        .pipe(concat('all.min.js', {newLine: ';'}))
        // Annotate before uglify so the code get's min'd properly.
        .pipe(ngAnnotate({
            // true helps add where @ngInject is not used. It infers.
            // Doesn't work with resolve, so we must be explicit there
            add: true
        }))
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest('./www/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

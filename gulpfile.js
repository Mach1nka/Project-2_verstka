const gulp = require('gulp');

const sass = require('gulp-sass');
const cleanCCS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const gulpif =require('gulp-if');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
let isProd = false;

gulp.task('html', function(cb) {
    return gulp.src('app/*.html')
    .pipe(gulp.dest('public/'));
});
gulp.task('fonts',function () {
  return gulp.src('app/fonts/**/*.*')
  .pipe(gulp.dest('public/fonts'));
});
gulp.task('font-awesome',function () {
  return gulp.src('app/libs/font-awesome/webfonts/**/*.*')
  .pipe(gulp.dest('public/webfonts'));
});

gulp.task('styles',function () {
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulpif(isProd , autoprefixer({
    browsers:['last 15 versions',' > 1% ', 'ie 8', 'ie 7']
  })))
  .pipe(gulpif(isProd, cleanCCS()))
  .pipe(gulp.dest('public/css'));
});

gulp.task('scripts', function() {
  return gulp.src('app/js/**/*.js')
  .pipe(concat('scripts.js'))
  .pipe(gulpif(isProd , uglify()))
  .pipe(gulp.dest('public/js'));
});

gulp.task('moveJquery', function() {
  return gulp.src('app/libs/jquery/dist/jquery.min.js')
  .pipe(gulp.dest('public/js'));
});

gulp.task('libScripts',function () {
  return gulp.src([
    'app/libs/masonry-layout/dist/masonry.pkgd.js',
    'app/libs/imagesloaded/imagesloaded.pkgd.js'])
  .pipe(concat('libs.js'))
  .pipe(gulpif(isProd,uglify()))
  .pipe(gulp.dest('public/js'));
});

gulp.task('assets',function() {
  return gulp.src('app/image/**/*.{png,gif,jpg,svg}')
  .pipe(gulp.dest('public/image'));
});

gulp.task('watch', function() {
  gulp.watch('app/*.html', gulp.series('html'));
  gulp.watch('app/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('app/js/**/*.js', gulp.series('scripts'));
});


gulp.task('serve', function () {
  browserSync.init({
    server:'public'
  });
  browserSync.watch('public/**/*.*').on('change',browserSync.reload);
});

gulp.task('build', gulp.series('html','styles','moveJquery','scripts','fonts','font-awesome','libScripts','assets'));

gulp.task('dev', gulp.series('build', gulp.parallel('serve','watch')));

var sources, destinations, lr, gulp, gutil, jade, styl, browserSync, reload, concat;

gulp = require('gulp');
jade = require('gulp-jade');
gutil = require('gulp-util');
styl = require('gulp-stylus');
imagemin = require('gulp-imagemin');
pngquant = require('imagemin-pngquant');
uglify = require('gulp-uglify');
browserSync = require('browser-sync');
concat = require('gulp-concat');
reload = browserSync.reload;

sources = {
  jade: [
    'src/jade/**/*.jade', 
    '!src/jade/**/_*.jade', 
    '!src/jade/_*/**/*.jade'
  ],
  styl: "src/styl/**/*",
  img: "src/img/*.*",
  fonts: "src/fonts/*.*",
  js: "src/js/*.*",
  semantic: [
    "semantic/dist/**/*",
    "!semantic/dist/semantic.css",
    "!semantic/dist/semantic.js"
  ]
};

destinations = {
  html: "build/",
  css: "build/css",
  img: "build/img",
  fonts: "build/fonts",
  js: "build/js",
  semantic: "build/semantic/dist"
};

gulp.task("jade", function(event) {
  return gulp.src(sources.jade).pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest(destinations.html))
});

gulp.task("styl", function(event) {
  return gulp.src(sources.styl)
  .pipe(styl({
    style: "compressed",
    compress: true
  }))
  .pipe(concat('main.css'))
  .pipe(gulp.dest(destinations.css));
});

gulp.task('img', function () {
  gulp.src(sources.img) // path to img
    // .pipe(imagemin({ // compress img
    //     progressive: true,
    //     svgoPlugins: [{removeViewBox: false}],
    //     use: [pngquant()],
    //     interlaced: true
    // }))
    .pipe(gulp.dest(destinations.img)) // put img to build
});

gulp.task('fonts', function() {
    gulp.src(sources.fonts)
      .pipe(gulp.dest(destinations.fonts))
});

gulp.task('js', function() {
    gulp.src(sources.js)
      // .pipe(uglify()) // compress all js
      .pipe(gulp.dest(destinations.js))
});

gulp.task('semantic', function() {
    gulp.src(sources.semantic)
      .pipe(gulp.dest(destinations.semantic))
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./build"
    },
    open: true,
    notify: false,
    reloadDelay: 1000
  });
});

gulp.task("watch", function() {
  gulp.watch('src/jade/**/*.jade', ["jade"]);
  gulp.watch(sources.styl, ["styl"]);
  gulp.watch(sources.img, ["img"]);
  gulp.watch(sources.fonts, ["fonts"]);
  gulp.watch(sources.js, ["js"]);
  gulp.watch('build/**/*', reload);
});


gulp.task("default", ["jade", "styl", "watch", "fonts", "js", "browserSync", "img", "semantic"]);


/**
 * The streaming build system
 * gulpjs.com
 */

var gulp = require("gulp"),
    gutil = require("gulp-util"),
    less = require("gulp-less"),
    minifyCSS = require("gulp-minify-css"),
    coffee = require("gulp-coffee"),
    browserify = require("gulp-browserify"),
    uglify = require("gulp-uglify"),
    connect = require("gulp-connect"),
    watch = require("gulp-watch");

gulp.task("connect", connect.server({
  root: ["dist"],
  port: 8000,
  livereload: true
}));

gulp.task("less", function () {
  watch({glob: "src/less/**/*.less"})
      .pipe(less())
      .pipe(minifyCSS())
      .pipe(gulp.dest("dist/css"))
      .pipe(connect.reload());
});

gulp.task("coffee", function () {
  watch({glob: "src/coffee/**/*.coffee"})
      .pipe(coffee({bare: true}))
      .on("error", gutil.log)
      .pipe(gulp.dest("src/js"));
});

gulp.task("browserify", function () {
  watch({glob: "src/js/**/**.js", emitOnGlob: false}, function () {
    gulp.src("src/js/ui.js")
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
  });
});

gulp.task("static", function () {
  watch({glob: "dist/**/**.html", emitOnGlob: false})
      .pipe(connect.reload());
  watch({glob: "dist/img/**/**", emitOnGlob: false})
      .pipe(connect.reload());
});

gulp.task("default", ["connect", "less", "browserify", "coffee", "static"]);

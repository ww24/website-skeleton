/**
 * The streaming build system
 * gulpjs.com
 */

var gulp = require("gulp"),
    plg = require("gulp-load-plugins")();

gulp.task("connect", plg.connect.server({
  root: ["dist"],
  port: 8000,
  livereload: true
}));

gulp.task("browserify", function () {
  plg.watch({glob: "src/js/**/**.js", emitOnGlob: false}, function () {
    gulp.src("src/js/ui.js")
        .pipe(plg.plumber())
        .pipe(plg.browserify())
        .pipe(plg.uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(plg.connect.reload());
  });
});

gulp.task("coffee", function () {
  plg.watch({glob: "src/coffee/**/*.coffee"})
      .pipe(plg.plumber())
      .pipe(plg.coffee({bare: true}))
      .pipe(gulp.dest("src/js"));
});

gulp.task("less", function () {
  plg.watch({glob: "src/less/**/*.less"}, function () {
    gulp.src("src/less/**/*.less")
        .pipe(plg.plumber())
        .pipe(plg.less())
        .pipe(plg.concat("style.css"))
        .pipe(plg.minifyCss())
        .pipe(gulp.dest("dist/css"))
        .pipe(plg.connect.reload());
  });
});

gulp.task("static", function () {
  plg.watch({glob: "dist/**/**.html", emitOnGlob: false})
      .pipe(plg.connect.reload());
  plg.watch({glob: "dist/img/**/**", emitOnGlob: false})
      .pipe(plg.connect.reload());
});

gulp.task("default", ["connect", "browserify", "coffee", "less", "static"]);

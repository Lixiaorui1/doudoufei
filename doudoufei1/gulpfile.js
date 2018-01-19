var gulp = require("gulp");
var sass = require("gulp-sass");
gulp.task("styles", function() {
    return gulp.src("public/sass/*.scss").pipe(sass({ style: "nested" })).pipe(gulp.dest("public/stylesheets"));
})

gulp.task("watch", function() {
    gulp.watch("public/sass/*.scss", ["styles"]);
})
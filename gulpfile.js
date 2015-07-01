var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");

gulp.slurped = false;

gulp.task("default", function(){
	gulp.src("baton.js")
	.pipe(plumber())
	.pipe(uglify())
	.pipe(rename("baton.min.js"))
	.pipe(gulp.dest("./"))

	if(!gulp.slurped) gulp.watch(["baton.js"], ["default"]);
	gulp.slurped = true;
});

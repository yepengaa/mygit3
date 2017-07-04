


var gulp = require("gulp");
var gulpjs=require("gulp-uglify");
var minifycss=require("gulp-minify-css");
var babel = require('gulp-babel');  

gulp.task("jstask",function(){
	gulp.src("js/foePlane.js")
    .pipe(babel({presets: ['es2015']}))  
	.pipe(gulpjs())
	.pipe(gulp.dest("dest/js"));
	
})

//gulp.task("csstask",function(){
//	gulp.src("css/*.css")
//	.pipe(minifycss())
//	.pipe(gulp.dest("dest/css"));
//	
//})

gulp.task("default",["jstask"]);

//var gulp = require('gulp');  
//var babel = require('gulp-babel');  
//gulp.task('jstask', function () {  
//  gulp.src('js/foePlane.js')  
//      .pipe(babel({presets: ['es2015']}))  
//      .pipe(gulp.dest('dest/js'));  
//});  
//
//gulp.task("default",["jstask"]);
















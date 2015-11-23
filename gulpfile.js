var gulp = require('gulp');
var jshint = require('gulp-jshint');
var server = require('gulp-develop-server');

gulp.task('lint',function() {
 return gulp.src('./app.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
});

gulp.task('startServer', function() {
    server.listen( { path: './app.js' } );
});

gulp.task('default',['lint','startServer'],function() {
 gulp.watch( [ './app.js' ], server.restart );  
});

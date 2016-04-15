var gulp = require('gulp');

gulp.task('welcome', function(){
	console.log('welcome');
})

gulp.task('hello', ['welcome'], function(){
	console.log('hello');
})

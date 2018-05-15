"use strict"

var gulp = require("gulp");
//var browserify = require('browserify'); // Bundles JS50

// config
var config = {

paths:{

	html: './src/html/*.html',
		js: [
		    './website/local/javascripts/*.js',
		    './website/local/javascripts/data/data.js',
		    './website/local/javascripts/trade-manager/trade.js',
			 'node_modules/bootstrap/dist/js/bootstrap.min.js',
			 'node_modules/datatables.net/js/jquery.dataTables.js',
			 'node_modules/jquery-comments/js/jquery-comments.js',
			 'node_modules/jquery/dist/jquery.min.js',
			 
			 'node_modules/underscore/underscore-min.js',
			 'node_modules/localstoragedb/localstoragedb.min.js',
			 'node_modules/bignumber.js/bignumber.min.js',
			 'node_modules/numeral/min/numeral.min.js',
			 'node_modules/chart.js/dist/Chart.min.js',
			 
			 ],
		images: ['./website/local/images/*.*',
		
		'node_modules/datatables.net-dt/images/*.*',
		
		
		],
		fontawesome: [ 'node_modules/font-awesome/**'],
		css: [
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
                'node_modules/jquery-comments/css/jquery-comments.css',
                'node_modules/datatables.net-dt/css/*.*',
                'website/local/stylesheets/site.css' ,
                'website/local/stylesheets/datatables.min.css'
			 
			  
    	],
		dist: './website/public',
		mainJs: './src/main.js'

}

}

gulp.task('images', function() {
	gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist +'/images'));
});
gulp.task('css', function() {
	gulp.src(config.paths.css)
    .pipe(gulp.dest(config.paths.dist +'/stylesheets'));
});
gulp.task('fontawesome', function() {
	gulp.src(config.paths.fontawesome)
    .pipe(gulp.dest(config.paths.dist +'/stylesheets/fontawesome/'));
});

gulp.task('js',()=>{

   	gulp.src(config.paths.js)
	.pipe(gulp.dest(config.paths.dist +'/javascripts/'));
		
});


gulp.task('default',['js','css','images','fontawesome']);
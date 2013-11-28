/* jshint node: true */

module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        uglify: {
            target: {
                files: {
                    './js/min.js': [
                        './bower_components/jquery/jquery.js',
                        './js/bootstrap-stripped.js',
                        './bower_components/angular/angular.js',
                        './bower_components/angular-route/angular-route.js',
                        './bower_components/angular-animate/angular-animate.js',
                        './bower_components/jquery.lazyload/jquery.lazyload.js'
                    ],
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    './css/min.css': [
						'./css/bootstrap-stripped.css',
                        './css/font-awesome-stripped.css',
                        './css/more.css'
                    ]
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['uglify', 'cssmin']);

};

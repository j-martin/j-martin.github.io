/* jshint node: true */

module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        copy: {
          main: {
            flatten: true,
            filter: 'isFile',
            expand: true,
            src: 'bower_components/font-awesome/fonts/*',
            dest: './public/fonts/',
          },
        },
        uglify: {
            target: {
                files: {
                    './public/js/min.js': [
                        './bower_components/jquery/jquery.js',
                        './public/js/bootstrap-stripped.js',
                        './bower_components/angular/angular.js',
                        './bower_components/angular-route/angular-route.js',
                        './bower_components/angular-animate/angular-animate.js',
                        //'./bower_components/jquery.lazyload/jquery.lazyload.js'
                        './bower_components/echo/dist/echo.js'
                    ],
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    './public/css/min.css': [
						'./public/css/bootstrap-stripped.css',
                        './public/css/font-awesome-stripped.css',
                        './public/css/more.css'
                    ]
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['copy','uglify', 'cssmin']);

};

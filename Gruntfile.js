/* jshint node: true */

module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        uglify: {
            target: {
                files: {
                    './js/min.js': [
                        './lib/jquery-2.0.3.js',
                        './lib/bootstrap-3.0.2/js/bootstrap-stripped.js',
                        './lib/angular-1.2.0/angular.js',
                        './lib/angular-1.2.0/angular-animate.js',
                        './lib/angular-1.2.0/angular-route.js',
                        './lib/jquery.lazyload.js',
                    ],
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    './css/min.css': [
                        './lib/bootstrap-3.0.2/css/bootstrap.css',
                        './lib/font-awesome-4.0.3/css/font-awesome-stripped.css',
                        './css/more.css'
                    ]
                }
            }
        },
        php_builder: {
            options: {
                // Task-specific options go here.
            },
            files: {
                './img/post/': [
                    './img/photo.php',
                    './img/render.php',
                ]

            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('chop-grunt-php-builder');

    grunt.registerTask('default', ['uglify', 'cssmin']);
    grunt.registerTask('php', ['php_builder']);

};

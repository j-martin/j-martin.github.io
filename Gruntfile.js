/* jshint node: true */

module.exports = function (grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    image_processor: {
      photo: {
        src: './public/img/photo/*.jpg',
        dest: './public/json/photo.json',
        cache: './public/cache/img/photo/'
      },
      render: {
        src: './public/img/render/*.jpg',
        dest: './public/json/render.json'
      }
    },

    shell: {
      launchExpress: {
        options: {
          stdout: true
        },
        command: 'node server.js'
      },
      bigpush: {
        options: {
          stdout: true
        },
        command: 'fab big_push'
      }
    },
    jshint: {
      all: ['Gruntfile.js',
        './node.js/*.js',
        './js/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jsbeautifier: {
      modify: {
        src: ['Gruntfile.js',
          './node/*.js',
          './public/js/*.js'
        ],
        options: {
          config: '.jsbeautifyrc'
        }
      },
      verify: {
        src: ['Gruntfile.js',
          './node/*.js',
          './js/*.js'
        ],
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    },
    copy: {
      main: {
        files: [{
          flatten: true,
          filter: 'isFile',
          expand: true,
          src: 'bower_components/font-awesome/fonts/*',
          dest: './public/fonts/',
        }, {
          flatten: true,
          filter: 'isFile',
          expand: true,
          src: './js/*',
          dest: './public/js/',
        }, ]
      }
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('tasks');

  grunt.registerTask('default', [
    'copy',
    'clean',
    'uglify',
    'image_processor',
    'cssmin'
  ]);
  grunt.registerTask('server', [
    'default',
    'shell'
  ]);
  grunt.registerTask('clean', [
    'jsbeautifier:modify',
    'jshint'
  ]);
  grunt.registerTask('verify', [
    'jsbeautifier:verify',
    'jshint'
  ]);
};

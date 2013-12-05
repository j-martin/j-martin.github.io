/* jshint node: true */

module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    html_snapshots: {
      // options for all targets
      options: {
        input: "sitemap",
        source: 'http://jmartin.ca/public/sitemap.xml',
        hostname: 'jmartin.ca',
        selector: {
          "__default": "#dynamic-content",
          "/": "#home-content"
        },
        // outputDirClean: 'true',
      },
      // the release target
      release: {
        options: {
          outputDir: './snapshots'
        }
      }
    },
    // Concatenate CSS files
    concat: {
      animate_custom: {
        src: [
          // _base.css required for .animated helper class
          './bower_components/animate/source/_base.css',
          './bower_components/animate/source/fading_entrances/fadeInDownBig.css',
          './bower_components/animate/source/fading_exits/fadeOutDownBig.css'
        ],
        dest: './less/animate_temporary.css'
      }
    },
    // Watch files for changes
    watch: {
      css: {
        files: [
          'less/*',
          'less/**/*',
        ],
        // Run Sass, autoprefixer, and CSSO
        tasks: ['less-custom'],
      }
    },

    // Auto-prefix CSS properties using Can I Use?
    autoprefixer: {
      options: {
        browsers: ['last 3 versions', 'bb 10', 'android 3']
      },
      no_dest: {
        // File to output
        src: './less/animate_temporary.css'
      },
    },
    less: {
      development: {
        options: {
          relativeUrls: true,
          paths: ['assets/css']
        },
        files: {
          'public/css/out.css': 'less/main.less'
        }
      },
      production: {
        options: {
          paths: ['assets/css'],
          cleancss: true
        },
        files: {
          'public/css/out.min.css': 'less/main.less'
        }
      }
    },

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
      }
    },
    jshint: {
      all: ['Gruntfile.js',
        './tasks/*.js',
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-html-snapshots');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('tasks');

  grunt.registerTask('default', [
    'copy',
    'less-custom',
    'clean',
    'uglify',
    'image_processor',
    'cssmin'
  ]);

  grunt.registerTask('less-custom', ['concat', 'autoprefixer', 'less']);

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

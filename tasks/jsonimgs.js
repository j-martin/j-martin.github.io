/* jshint node: true */

'use strict';
// Grunt Task

// Creates json files based on the folder list. 
// This is required since it the site should run
// with no server-side scripting.

// Requires ImageMagik installed on the server.



//Creates the Grunt Module

module.exports = function(grunt) {

  var im = require('imagemagick');
  var image_listing = {

    set_name: function(name, relative_path) {
      this.name = name;

      if (!relative_path) {
        relative_path = '../public/';
      }
      this.base_dir = relative_path + 'img/';
      this.cache_dir = relative_path + 'cache/';
      this.json_dir = relative_path + 'json/';
      this.cache_path = this.cache_dir + 'img/' + this.name;

      this.path_dir = this.base_dir + this.name;

      grunt.verbose.writeln(this.base_dir,
        this.cache_dir,
        this.json_dir,
        this.path_dir);

      this.get_files();

    },

    get_files: function() {

      var path = this.path_dir + '*.(jpg|png)';

      // grunt.verbose.log(this.path);

      this.files = grunt.file.expand(path);

      var json_path = this.json_dir + this.name + '.json';
      var json_data = JSON.stringify(this.files);

      grunt.file.write(json_path, json_data);

      grunt.verbose.writeln(this.files);
      grunt.log.writeln('Wrote JSON to: ' + json_path);
    },

    caching: function() {

      this.files.forEach(function(file) {
        var file_path_original = this.path_dir + '/' + file;
        var file_path_cache = this.cache_path + '/' + file;

        grunt.verbose.writeln(file_path_original, file_path_cache);

        if (!grunt.file.exists(file_path_cache)) {
          grunt.log.writeln(file_path_cache, 'is missing');

          im.resize({
            srcPath: file_path_original,
            dstPath: file_path_cache,
            width: 800,
            quality: 0.9,
          }, function(err, stdout, stderr) {
            if (err) {
              throw err;
            }
            grunt.log.writeln('Cached: ' + file_path_original);
          });
        }
      }, this);
    }
  };

  grunt.registerMultiTask('jsonimgs',
    'Creates JSON files and cache images',
    function() {
      grunt.file.defaultEncoding = 'utf8';

      var render = Object.create(image_listing);
      var photo = Object.create(image_listing);

      render.set_name('render', './public/');
      photo.set_name('photo', './public/');
      photo.caching();
    });
};

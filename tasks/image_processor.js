// Title: Image Processor - Grunt Task
// Author: Jean-Martin Archer

// Creates json files based on the folder list. 
// This is required since it the site should run
// with no server-side scripting.
// Requires ImageMagik installed on the server.

var im = require('imagemagick');

//Creates the Grunt Module
module.exports = function(grunt) {
  'use strict';

  var image_processor = function() {

    var images = [];

    grunt.file.defaultEncoding = 'utf8';

    this.files.forEach(function(file) {

      var cache_path = this.data.cache;

      file.src.map(function(filepath) {
        var filename = filepath.split('/').pop();
        images.push(filename);

        if (cache_path) {
          image_cacher(filepath, cache_path + filename);
        }

      });
    }, this);

    var json_path = this.data.dest;
    var json_data = JSON.stringify(images);

    grunt.file.write(json_path, json_data);
  };

  var image_cacher = function(filepath, file_path_cache) {

    if (!grunt.file.exists(file_path_cache)) {
      grunt.log.writeln(file_path_cache, 'is missing');

      im.resize({
        srcPath: filepath,
        dstPath: file_path_cache,
        width: 800,
        quality: 0.9,

      }, function(err, stdout, stderr) {
        if (err) {
          throw err;
        }
      });
      grunt.log.writeln('Cached: ' + filepath);
    }
  };

  grunt.registerMultiTask('image_processor', 'Creates JSON files and cache images', image_processor);
};

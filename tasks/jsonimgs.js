'use strict';

// Grunt Task
// Creates json files based on the folder list. 
// This is required since it the site should run
// with no server-side scripting.
// Requires ImageMagik installed on the server.

//Creates the Grunt Module
var im = require('imagemagick');

module.exports = function(grunt) {

  grunt.registerMultiTask('jsonimgs', 'Creates JSON files and cache images',
    function() {

      var images = [];

      grunt.file.defaultEncoding = 'utf8';

      this.files.forEach(function(file) {

        var cache_path = this.data.cache;

        // grunt.verbose.writeln(cache_path);

        file.src.map(function(filepath) {
          var filename = filepath.split('/').pop();
          images.push(filename);
          
          if (cache_path) {
            grunt.log.writeln('cache_path');
            grunt.log.writeln(cache_path);
            caching(filepath, cache_path + filename);
          }

        }, cache_path);
      }, this);

      var json_path = this.data.dest;
      var json_data = JSON.stringify(images);

      grunt.file.write(json_path, json_data);

      var caching = function(filepath, file_path_cache) {
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
            grunt.log.writeln('Cached: ' + filepath);
          });

        }

      };
    });
};

/* jshint node: true */
'use strict';

// Creates json files based on the folder list. 
// This is required since it the site should run
// with no server-side scripting.

// Requires ImageMagik installed on the server.

var fs = require('fs'),
im = require('imagemagick');

var image_listing = {

    base_dir: '../img/',
    cache_dir: '../cache/',
    json_dir: '../json/',

    set_name: function(name) {
        this.name = name;
        this.path_dir = this.base_dir + this.name;
        this.get_files();
    },

    get_files: function() {

        this.files = fs.readdirSync(this.path_dir);

        var json_path = this.json_dir + this.name + '.json';

        var json_data = JSON.stringify(this.files);
        fs.writeFileSync(json_path, json_data);

    },

    caching: function() {

        this.cache_path = this.cache_dir + this.base_dir.substring(3) + this.name;

        this.files.forEach(function(file) {
            var file_path_original = this.path_dir + '/' + file;
            var file_path_cache = this.cache_path + '/' + file;

            // console.log(file_path_original, file_path_cache);

            if (!fs.existsSync(file_path_cache)) {
                console.log(file_path_cache, 'is missing');
                
                im.resize({
                  srcPath: file_path_original,
                  dstPath: file_path_cache,
                  width:   800
                }, function(err, stdout, stderr){
                  if (err) throw err;
                  console.log('resized kittens.jpg to fit within 256x256px');
                });
            }

        }, this);
    }
};

var render = image_listing;
var photo = image_listing;

render.set_name('render');
photo.set_name('photo');
photo.caching();

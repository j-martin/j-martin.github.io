#!/bin/env node

'use strict';
/*global require:false */
/*global process:false */
/*global console:false */
/*global __dirname:false */

//Get the environment variables we need.
var ipaddr = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 5000;

var express = require('express'),
    app = express();

app.configure(function() {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    // app.use(require('prerender-node'));
    app.use(express.static(__dirname + '/'));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.use(app.router);
});

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

if (!ipaddr) {
    app.listen(port);
} else {
    app.listen(port, ipaddr);
}
console.log('Server running on port: ' + port + ' !');

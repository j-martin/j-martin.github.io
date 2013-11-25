#!/bin/env node

'use strict';

//  OpenShift sample Node application
var express = require("express"),
    app     = express(),

,ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
, port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.get("/", function(req, res) {
  res.redirect("index.html");
});

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(app.router);
});

app.listen(port);

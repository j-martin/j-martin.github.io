#!/bin/env node
//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 5000;

var express = require("express"),
    app     = express()
    
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

app.listen(port, ipaddr);
console.log("Server running at http://" + ipaddr + ":" + port + "/");

// Runs a server on port 5000. Works locally and on Heroku.

var express = require("express"),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 5000;
    
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
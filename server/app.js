var http = require('http'),
    express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require ("mongoose"),
    multer  = require('multer');

var app = express();
var port = Number(process.env.PORT || 3000);

var errorHandler = function(err, req, res, next) {
    if(!err) return next();
    console.log("[ERROR] ", err);
    res.status(500).send("Unexpected error ocurred!");
};

app.set('port', port);

//mongolab server

var uristring =
  'mongodb://swedishcook:BorkBorkBork@ds055732.mongolab.com:55732/siilirecipes';

mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger('tiny'));

// App Routes
var routes = require('./routes/index');
var recipes = require('./routes/recipes');
var recipePhotos = require('./routes/recipePhotos');

// App use
app.use("/",routes);
app.use("/api/", recipes);
app.use("/api/", recipePhotos);

//app.use(errorHandler);
if (!module.parent) {
  app.listen(port, function () {
      console.log('Express server listening on port ' + app.get('port'));
  });
}

process.on('uncaughtException', function (err) {
  console.log("UncaughtException: "+err);
})

module.exports = app;

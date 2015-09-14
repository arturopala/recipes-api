var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var RecipeService = require('../services/recipe');
var Recipe = require('../models/recipe');
var U = require('../utils/utils.js');
var multer  = require('multer')

var storagePath = '/tmp/uploads/';
var upload = multer({ dest: storagePath, limits: {
  fileSize: 1024*1024,
  files: 1,
  fields: 1
}});

router.post('/recipes/:recipeId/photos', upload.single('recipePhoto'), function (req, res, next) {
  var recipeId = req.params.recipeId;
  var thisRes = res;
  if(!req.file) {
    thisRes.status(400).send("File part 'recipePhoto' is missing!");
  } else if(req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
    thisRes.status(400).send("Image type should be jpeg or png!");
  } else {
    var filename = req.file.filename;
    var title = req.body.recipePhotoTitle;
    console.log("new file uploaded: "+filename+", title: "+title);
    RecipeService.get(recipeId)
    .then(
      function(recipe){
        recipe.photos.push({"photoId":filename,"title":title,"type":req.file.mimetype || "","size":req.file.size || 0});
        RecipeService.update(recipeId, recipe)
        .then(
          function(entity){
            thisRes.status(201).header("Link",'</api/recipes/'+recipeId+'/photos/'+filename+'>; rel="uploaded_image"').send();
          }, U.handleError(thisRes))
        .done();
      }, U.handleError(thisRes));
  }
});

var hasProperty = function(key,value){ return function(element, index, array) {
  return (element[key] && element[key] === value);
}};

var hasNotProperty = function(key,value){ return function(element, index, array) {
  return (element[key] && element[key] !== value);
}};

router.get('/recipes/:recipeId/photos/:photoId', function(req, res) {
  var recipeId = req.params.recipeId;
  var photoId = req.params.photoId;
  var thisRes = res;
  RecipeService.get(recipeId)
  .then(
      function(recipe){
        var photos = recipe.photos.filter(hasProperty('photoId',photoId));
        if(photos && photos[0]){
          var photo = photos[0];
          thisRes.sendFile(photo.photoId,{"root": storagePath, "headers": {"Content-Type": photo.type || "image/jpeg"}});
        } else {
          thisRes.status(404).send();
        }
      }, U.handleError(thisRes))
   .done();
});

router['delete']('/recipes/:recipeId/photos/:photoId', function(req, res) {
  var recipeId = req.params.recipeId;
  var photoId = req.params.photoId;
  var thisRes = res;
  RecipeService.get(recipeId)
  .then(
      function(recipe){
        var photos = recipe.photos.filter(hasNotProperty('photoId',photoId));
        recipe.photos = photos;
        RecipeService.update(recipeId, recipe)
        .then(
          function(entity){
            thisRes.status(200).send();
          }, U.handleError(thisRes))
        .done();
      }, U.handleError(thisRes));
});

module.exports = router;

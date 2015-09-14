var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var RecipeService = require('../services/recipe');
var Recipe = require('../models/recipe');
var U = require('../utils/utils.js');

/* GET recipes listing */
router.get('/recipes/', function(req, res) {
  var thisRes = res;
  RecipeService.findAll(req.query.s)
  .then(
      function(recipes){
        thisRes.status(200).send(recipes);
      }, U.handleError(thisRes))
   .done();
});

/* POST new recipe */
router.post('/recipes/', function(req, res) {
  var recipe = Recipe(req.body);
  var thisRes = res;
  recipe.validate(function (err) {
  	if(err) {
  		thisRes.status(400).send("Invalid recipe has been sent.");
  	} else {
  		RecipeService.store(recipe)
  		.then(
  	      function(entity){
  	        thisRes.status(201).header("Link",'</api/recipes/'+entity._id+'>; rel="created_item"; media=application/json').send();
  	      }, U.handleError(thisRes))
  	    .done();
  	}
  });
});

/* GET recipe by id */
router.get('/recipes/:recipeId', function(req, res) {
  var recipeId = req.params.recipeId;
  var thisRes = res;
  RecipeService.get(recipeId)
  .then(
      function(recipe){
        thisRes.status(200).send(recipe);
      }, U.handleError(thisRes))
   .done();
});

/** PUT updated recipe */
router.put('/recipes/:recipeId', function(req, res) {
	var recipeId = req.params.recipeId;
	var thisRes = res;
	if(!recipeId || !req.body) {
		thisRes.status(400).send('Missing `recipeId` or empty request body'); 
	} else {
		var update = req.body;
		RecipeService.update(recipeId, update)
		.then(
	      function(entity){
	        thisRes.status(200).header("Link",'</api/recipes/'+entity._id+'>; rel="updated_item"; media=application/json').send();
	      }, U.handleError(thisRes))
	   .done();
	}	
});

/* DELETE recipe by id */
router['delete']('/recipes/:recipeId', function(req, res) {
  var recipeId = req.params.recipeId;
  var thisRes = res;
  RecipeService.remove(recipeId)
  .then(
      function(result){
        thisRes.status(200).send(result.n);
      }, U.handleError(thisRes))
   .done();
});

module.exports = router;

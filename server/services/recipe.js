var Recipe = require('../models/recipe');
var IngredientService = require('./ingredient');
var Q = require("q")

var RecipeService = {

	findAll: function(selection){
		var q = Q.defer();
		var task = Recipe.find()
		if(selection){
			task = task.select(selection);
		}
		task.exec(function(err,recipes){
			if(err || !recipes) q.reject(err || "Not Found"); else q.resolve(recipes);
		});
		return q.promise;
	},

	get: function(recipeId){
		var q = Q.defer();
		Recipe.findOne({"_id":recipeId}).exec(function(err,recipe){
			if(err || !recipe) q.reject(err || "Not Found"); else q.resolve(recipe);
		});
		return q.promise;
	},

	update: function(recipeId, entity){
		if(recipeId && entity) {
			delete entity._id;
			delete entity.__v;
			var q = Q.defer();
			Recipe.findOneAndUpdate({"_id":recipeId}, entity).exec(function (err, _entity) {
				if(err || !_entity) q.reject(err || "Not Found"); else {
					updateIngredientsAsync(_entity.ingredients);
					q.resolve(_entity);
				}
			});
			return q.promise;
		} else return Q.fcall(function () {
		    throw new Error("Cannot update Recipe because undefined");
		});
	},

	store: function(recipe){
		if(recipe) {
			var q = Q.defer();
			recipe.save(function(err, saved){
				if(err || !saved) q.reject(err || "Not Found"); else {
					updateIngredientsAsync(saved.ingredients);
					q.resolve(saved);
				}
			});
			return q.promise;
		} else return Q.fcall(function () {
		    throw new Error("Cannot store Recipe because undefined");
		});
	},

	remove: function(recipeId){
		if(recipeId) {
			var q = Q.defer();
			Recipe.remove({"_id":recipeId}).exec(function(err, result){
				if(err) q.reject(err); else q.resolve(result);
			});
			return q.promise;
		} else return Q.fcall(function () {
		    throw new Error("Cannot remove Recipe because recipeId undefined");
		});
	} 
};

var updateIngredientsAsync = function(ingredients){
	ingredients.forEach(function(item){
		if( !item.unit ) item.unit = "pcs.";
		IngredientService.add(item);
	});
}

module.exports = RecipeService;
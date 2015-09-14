var Recipe = require('../models/recipe');
var Ingredient = require('../models/ingredient');
var Q = require("q")

var RecipeService = {

	findAll: function(selection){
		var q = Q.defer();
		var task = Recipe.find()
		if(selection){
			task = task.select(selection);
		}
		task.exec(function(err,recipes){
			if(err || !recipes) q.reject(err || "None recipes found"); else q.resolve(recipes);
		});
		return q.promise;
	},

	get: function(recipeId){
		var q = Q.defer();
		Recipe.findOne({"_id":recipeId}).exec(function(err,recipe){
			if(err || !recipe) q.reject(err || "None recipes found"); else q.resolve(recipe);
		});
		return q.promise;
	},

	update: function(recipeId, entity){
		if(recipeId && entity) {
			delete entity._id;
			delete entity.__v;
			var q = Q.defer();
			Recipe.findOneAndUpdate({"_id":recipeId}, entity).exec(function (err, _entity) {
				if(err) q.reject(err); else {
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
				if(err) q.reject(err); else {
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
			Recipe.remove({"_id":recipeId}).exec(function(err, saved){
				if(err) q.reject(err); else q.resolve(saved);
			});
			return q.promise;
		} else return Q.fcall(function () {
		    throw new Error("Cannot remove Recipe because recipeId undefined");
		});
	} 
};

var updateIngredientsAsync = function(ingredients){
	ingredients.forEach(function(item){
		if(!item.unit) item.unit = "pcs.";
		Ingredient.findOne({"name": item.name}).exec(function (err, ingredient) {
			if(!err){
				if(ingredient){
					var unitnotexistsyet = ingredient.units.filter(function(unit){return unit === item.unit}).length==0;
					if(unitnotexistsyet){
						ingredient.units.push(item.unit);
						ingredient.save(function(err, saved){});
						console.log("Updated ingredient "+JSON.stringify(ingredient));
					}
				} else {
					var ingredient = new Ingredient({"name":item.name,"units":[item.unit]});
					ingredient.save(function(err, saved){});
					console.log("Added new ingredient "+JSON.stringify(ingredient));
				}
			} else {
				console.log(err);
			}
		});
	});
}

module.exports = RecipeService;
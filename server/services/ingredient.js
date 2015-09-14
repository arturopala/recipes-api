var Ingredient = require('../models/ingredient');
var Q = require("q")

var IngredientService = {

	add: function(item){
		var q = Q.defer();
		Ingredient.findOne({"name": item.name}).exec(function (err, ingredient) {
			if(err) q.reject(err || "None recipes found"); else {
				if(ingredient){
					var unitnotexistsyet = ingredient.units.filter(function(unit){return unit === item.unit}).length==0;
					if(unitnotexistsyet){
						ingredient.units.push(item.unit);
						ingredient.save(function(err, saved){
							console.log("Updated ingredient "+JSON.stringify(saved));
							q.resolve(saved);
						});	
					}
				} else {
					var ingredient = new Ingredient({"name":item.name,"units":[item.unit]});
					ingredient.save(function(err, saved){
						console.log("Added new ingredient "+JSON.stringify(saved));
						q.resolve(saved);
					});
				}
			}
		});
		return q.promise;
	}
	
};

module.exports = IngredientService;
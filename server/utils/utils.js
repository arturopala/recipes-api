var Q = require("q")

var Utils = {

	handleError: function(response){
		return function(err){
	      	if(err) {
	      		if(err === "Not Found"){
					response.status(404).send();
	      		} else {
	      			response.status(400).send(err.errmsg || "");
	      		}
	      	} else {
	      		response.status(500).send();
	      	}
	    }
	},

	hasProperty: function(key,value){ return function(element, index, array) {
	  return (element[key] && element[key] === value);
	}},

	hasNotProperty: function(key,value){ return function(element, index, array) {
	  return (element[key] && element[key] !== value);
	}}

}

module.exports = Utils;
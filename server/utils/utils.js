var Q = require("q")

var Utils = {

	handleError: function(response){
		return function(err){
	      	if(err && err.errmsg) {
	      		response.status(400).send(err.errmsg);
	      	} else {
	      		response.status(500).send();
	      	}
	    }
	}

}

module.exports = Utils;
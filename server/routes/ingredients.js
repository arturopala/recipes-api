var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var Ingredient = require('../models/ingredient');
var U = require('../utils/utils.js');

/* GET recipes listing */
router.get('/ingredients/', function(req, res) {
  var thisRes = res;
  Ingredient.find().exec(function(err,ingredients){
    if(err) U.handleError(res)(err); else {
      res.status(200).send(ingredients);
    } 
  });
});

module.exports = router;

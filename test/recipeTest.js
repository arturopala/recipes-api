var should = require('should');
var assert = require('assert');
var expect = require('expect');
var request = require('supertest');
var Q = require("q")
var U = require(__dirname + '/../server/utils/utils.js');
var Recipe = require(__dirname + '/../server/models/recipe');
var RecipeService = require(__dirname + '/../server/services/recipe');
var app = require(__dirname + '/../server/app.js');

describe('Recipe Api tests', function() {

    var createdRecipeId;
    var expectedRecipe;
    var postRecipeResponse;

    beforeEach(function() {
        var q = Q.defer();
        expectedRecipe = {
            "title": "Test receipe no. "+ Math.ceil(Math.random()*1000000000000),
            "minutes": Math.ceil(Math.random()*100),
            "description": "jdjkjsa dsjadk sajdk sajdjksa jdsajkdjsajdiwquedwqdcbbcj dhsajjd hsajdjqhadhashkjd akhHDSJHAJS D",
            "ingredients": []
        };
        request(app).post('/api/recipes/')
        .send(expectedRecipe)
        .end(function(err, res){
            postRecipeResponse = res;
            if(err) q.reject(err || "error creating recipe"); else {
                createdRecipeId = /<\/api\/recipes\/(\w+?)>.*/.exec(res.get("Link"))[1]
                q.resolve();
            }
        });
        return q.promise;
    });

    afterEach(function() {
        if(createdRecipeId) {
            var q = Q.defer();
            Recipe.remove({"_id":createdRecipeId}).exec(function(err){
                if(err) q.reject(err || ""); else q.resolve();
            });
            return q.promise;
        }
    });

    it('- POST /api/recipes/ should create new recipe and return item link back', function(done){
        postRecipeResponse.status.should.be.equal(201);
        postRecipeResponse.body.should.be.json;
        postRecipeResponse.get("Link").should.startWith("</api/recipes/");
        done();
    });

    it('- GET /api/recipes/ should list all recipes as json', function(done){
        request(app).get('/api/recipes/')
        .send()
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                res.status.should.be.equal(200);
                res.body.should.be.json;
                res.body.filter(U.hasProperty('title',expectedRecipe.title)).length.should.be.equal(1);
                done();
            }
        });
    });

    it('- GET /api/recipes/{RECIPE_ID} should get recipe as json', function(done){
        request(app).get('/api/recipes/'+createdRecipeId)
        .send()
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                res.status.should.be.equal(200);
                res.body.should.be.json;
                res.body.minutes.should.be.equal(expectedRecipe.minutes);
                res.body.title.should.be.equal(expectedRecipe.title);
                res.body.description.should.be.equal(expectedRecipe.description);
                done();
            }
        });
    });

    it('- DELETE /api/recipes/{RECIPE_ID} should remove recipe', function(done){
        request(app)['delete']('/api/recipes/'+createdRecipeId)
        .send()
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                res.status.should.be.equal(200);
                RecipeService.get(createdRecipeId).then(function(){
                    createdRecipeId = undefined;
                    done("recipe should be already removed");
                }, function(err){
                    createdRecipeId = undefined;
                    done();
                });
            }
        });
    });

});

describe('Recipe Api error code tests', function() {
    it('- GET /api/recipes/foo should return 400 Bad Request', function(done){
        request(app).get('/api/recipes/foo')
        .send()
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                res.status.should.be.equal(400);
                done();
            }
        });
    });

    it('- GET /api/recipes/55f2d43a33cdf8490d0e627a should return 404 Not Found', function(done){
        request(app).get('/api/recipes/55f2d43a33cdf8490d0e627a')
        .send()
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                res.status.should.be.equal(404);
                done();
            }
        });
    });
});
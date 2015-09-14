var should = require('should');
var assert = require('assert');
var expect = require('expect');
var request = require('supertest');
var Q = require("q")
var Recipe = require(__dirname + '/../server/models/recipe');
var app = require(__dirname + '/../server/app.js');

describe('Recipe Api tests', function() {

    var createRecipe = function(){
        var q = Q.defer();
        var recipe = {
            "title": "Test receipe no. "+ Math.ceil(Math.random()*1000000000000),
            "minutes": Math.ceil(Math.random()*100),
            "description": "jdjkjsa dsjadk sajdk sajdjksa jdsajkdjsajdiwquedwqdcbbcj dhsajjd hsajdjqhadhashkjd akhHDSJHAJS D",
            "ingredients": []
        };
        request(app).post('/api/recipes/')
        .send(recipe)
        .end(function(err, res){
            if(err) q.reject(err || "error creating recipe"); else {
                var recipeId = /<\/api\/recipes\/(\w+?)>.*/.exec(res.get("Link"))[1]
                q.resolve([res, recipeId, recipe]);
            }
        });
        return q.promise;
    };

    it('- POST /api/recipes/ should create new recipe and return item link back', function(done){
        createRecipe()
        .then(
            function(result){
                var res = result[0];
                var id = result[1];
                res.status.should.be.equal(201);
                res.body.should.be.json;
                res.get("Link").should.startWith("</api/recipes/");
                done();
            },
            function(err){ done(err);}
        );
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
                done();
            }
        });
    });

    it('- GET /api/recipes/{RECIPE_ID} should get recipe as json', function(done){
        createRecipe()
        .then(
            function(result){
                var id = result[1];
                var expected = result[2];
                request(app).get('/api/recipes/'+id)
                .send()
                .end(function(err, res){
                    if(err){
                        done(err);
                    } else {
                        res.status.should.be.equal(200);
                        res.body.should.be.json;
                        res.body.minutes.should.be.equal(expected.minutes);
                        res.body.title.should.be.equal(expected.title);
                        res.body.description.should.be.equal(expected.description);
                        done();
                    }
                });
            },
            function(err){ done(err);}
        );
    });



});
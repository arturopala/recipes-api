var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new mongoose.Schema({
    "_id": { type: Schema.Types.ObjectId, auto: true},
    "title": { type: String, required: true, index: true, unique: true},
    "minutes": { type: Number },
    "lang": {type: String},
    "description": { type: String, required: true },
    "ingredients": [
    	{
            "_id": false,
	        "name": { type: String, required: true },
	        "quantity": { type: Number },
	        "unit": { type: String},
	        "comment": { type: String }
    	}
    ],
    "photos": [
        {
            "_id": false,
            "photoId": {type: String},
            "title": {type: String},
            "type": {type: String},
            "size": {type: Number}
        }
    ],
    "tags": { type: [String], index: true }
});

recipeSchema.set('toJSON', { versionKey: false, transform: function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret.__v;
}});

module.exports = mongoose.model('Recipe', recipeSchema);
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new mongoose.Schema({
    "_id": { type: Schema.Types.ObjectId, auto: true},
    "title": { type: String, required: true},
    "minutes": { type: Number },
    "lang": {type: String},
    "description": { type: String, required: true },
    "ingredients": [
    	{
	        "name": { type: String, required: true },
	        "quantity": { type: Number },
	        "unit": { type: String},
	        "comment": { type: String }
    	}
    ],
    "photos": [
        {
            "photoId": {type: String},
            "title": {type: String},
            "type": {type: String},
            "size": {type: Number}
        }
    ]
});

recipeSchema.set('toJSON', { versionKey: false, transform: function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret.__v;
}});

module.exports = mongoose.model('Recipe', recipeSchema);
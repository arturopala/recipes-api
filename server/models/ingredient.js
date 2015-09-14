var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var ingredientSchema = new mongoose.Schema({
    "_id": { type: Schema.Types.ObjectId, auto: true},
    "name": { type: String, required: true, index: true, unique: true},
    "units": { type: [String]}
});

ingredientSchema.set('toJSON', { versionKey: false, transform: function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret._id;
  delete ret.__v;
}});

module.exports = mongoose.model('Ingredient', ingredientSchema);
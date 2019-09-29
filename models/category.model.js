const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash/array');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  metaTags: [
    {
      type: String,
      trim: true
    }
  ]
});

categorySchema.methods.updateCategory = function(newName, newTagsArray) {
  this.name = newName;

  if (newTagsArray) {
    //union : creates an array of unique values, in order, from all given arrays
    this.metaTags = _.union(this.metaTags, newTagsArray);
  }

  return this.save();
};

//Automatically creates a Colection named 'categories' (plural) and push this document into it.
const category = mongoose.model('category', categorySchema);
module.exports = category;

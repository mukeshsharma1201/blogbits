const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user' //Case-sensitive Model name
    },
    description: String,
    coverImage: String,
    upvotes: Number,
    body: String,
    text: String,
    comments: [{ body: String, date: Date }],
    categories: [
      {
        name: String,
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' }
      }
    ],
    timestamp: { type: Date, default: Date.now }
  },
  {
    timestamps: true //Automatically creates createdAt and updatedAt fields and manages them
  }
);

articleSchema.methods.upvote = function() {
  this.upvotes++;
  return this.save();
};

//Automatically creates a Colection named 'articles' (plural) and push this document into it.
const Article = mongoose.model('article', articleSchema);
module.exports = Article;

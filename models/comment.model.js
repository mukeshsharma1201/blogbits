const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: String,
    upvotes: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'article' },
    timestamp: { type: Date, default: Date.now }
  },
  {
    timestamps: true //Automatically creates createdAt and updatedAt fields and manages them
  }
);

commentSchema.methods.updateComment = function(newText) {
  this.text = newText;
  return this.save();
};

commentSchema.methods.upvote = function() {
  this.upvotes++;
  return this.save();
};

//Automatically creates a Colection named 'comments' (plural) and push this document into it.
const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;

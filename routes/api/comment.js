const _ = require('lodash');
const express = require('express');
const router = express.Router();

//Model
const Comment = require('../../models/comment.model');

// @route GET api/comments
// @desc GET all Comments from DB
router.get('/', (req, res) => {
  Comment.find()
    .populate({ path: 'author', select: '-authtoken -__v' }) //Get everything from user except authtoken and __v
    .sort({
      timestamp: -1 //Desc
    })
    .then(allComments => res.json(allComments))
    .catch(() => res.status(400));
});

// @route POST api/comments
// @desc Create one Comments on DB
router.post('/', (req, res) => {
  const newComment = new Comment({
    text: req.body.text,
    author: req.body.authorId,
    authorId: req.body.authorId,
    articleId: req.body.articleId,
    upvotes: 0
  });

  newComment
    .save()
    .then(item => res.json(item))
    .catch(error => res.status(400).json(error));
});

// @route POST api/comments/upvote
// @desc Create one Article on DB
router.post('/upvote', (req, res) => {
  const commentId = req.body.commentId;

  if (_.isNil(commentId)) {
    return res.status(400).json({ error: 'Missing commentId' });
  }

  Comment.findById(commentId)
    .then(article => article.upvote())
    .then(newComment =>
      res.json({ message: 'Upvote successfull', data: newComment })
    )
    .catch(error => {
      console.log(error);
      res.status(400).json({ error: error });
    });
});

// @route POST api/comments/update
// @desc Update one Article on DB
router.post('/update', (req, res) => {
  const commentId = req.body.commentId;
  const commentText = req.body.text || '';
  if (_.isNil(commentId)) {
    return res.status(400).json({ error: 'Missing commentId' });
  }

  Comment.findById(commentId)
    .then(article => article.updateComment(commentText))
    .then(newComment =>
      res.json({ message: 'Update successfull', data: newComment })
    )
    .catch(error => {
      console.log(error);
      res.status(400).json({ error: error });
    });
});

module.exports = router;

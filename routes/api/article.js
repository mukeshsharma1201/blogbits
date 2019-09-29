const _ = require('lodash');
const express = require('express');
const router = express.Router();

//Model
const Article = require('../../models/article.model');

// @route GET api/articles
// @desc GET all Articles from DB
router.get('/', (req, res) => {
  Article.find()
    .populate({ path: 'author', select: '-authtoken -__v' }) //Get everything from user except authtoken and __v
    .populate({ path: 'categories', select: '-__v' })
    .sort({
      timestamp: -1 //Desc
    })
    .then(allArticles => res.json(allArticles))
    .catch(() => res.status(400));
});

// @route POST api/articles
// @desc Create one Article on DB
router.post('/', (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    coverImage: req.body.coverImage,
    upvotes: req.body.upvotes,
    body: req.body.body,
    comments: req.body.comments,
    timestamp: req.body.timestamp
  });

  newArticle
    .save()
    .then(item => res.json(item))
    .catch(error => res.status(400).json(error));
});

// @route POST api/articles
// @desc Create one Article on DB
router.post('/upvote', (req, res) => {
  const articleId = req.body.articleId;

  if (_.isNil(articleId)) {
    return res.status(400).json({ error: 'Missing articleId' });
  }

  Article.findById(articleId)
    .then(article => article.upvote())
    .then(newArticle =>
      res.json({ message: 'Upvote successfull', data: newArticle })
    )
    .catch(error => {
      console.log(error);
      res.status(400).json({ error: error });
    });
});

module.exports = router;

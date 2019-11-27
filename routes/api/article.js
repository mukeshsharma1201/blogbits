var multipart = require('connect-multiparty');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
var multipartMiddleware = multipart();
const cloudinary = require('cloudinary');

//Model
const Article = require('../../models/article.model');

// @route GET api/articles
// @desc GET all Articles from DB
router.get('/', (req, res) => {
  console.log('GET: Articles');

  Article.find()
    .populate({ path: 'author', select: '-authtoken -__v' }) //Get everything from user except authtoken and __v
    .populate({ path: 'categories', select: '-__v' })
    .sort({
      timestamp: -1 //Desc
    })
    .then(allArticles => res.json(allArticles))
    .catch(() => res.status(400));
});

// @route GET api/users
// @desc GET all Users list from DB
router.get('/:aid', (req, res) => {
  const aid = req.params.aid;

  Article.findOne({ _id: aid })
    .populate({ path: 'author', select: '-authtoken -__v' }) //Get everything from user except authtoken and __v
    .populate({ path: 'categories', select: '-__v' })
    .then(art => res.json(art))
    .catch(() => res.status(400));
});

// @route POST api/articles
// @desc Create one Article on DB
router.post('/', multipartMiddleware, (req, res) => {
  if (req.files.image) {
    cloudinary.uploader.upload(
      req.files.image.path,
      result => {
        const newArticle = {
          title: req.body.title,
          author: req.body.author,
          text: req.body.text,
          description: req.body.description,
          coverImage: result.url != null ? result.url : '',
          upvotes: req.body.upvotes,
          body: req.body.text,
          comments: req.body.comments,
          timestamp: req.body.timestamp
        };
        new Article(newArticle)
          .save()
          .then(item => res.json(item))
          .catch(error => res.status(400).json(error));
      },
      {
        resource_type: 'image',
        eager: [{ effect: 'sepia' }]
      }
    );
  } else {
    const newArticle = {
      title: req.body.title,
      author: req.body.author,
      text: req.body.text,
      description: req.body.description,
      coverImage: '',
      upvotes: req.body.upvotes,
      body: req.body.text,
      comments: req.body.comments,
      timestamp: req.body.timestamp
    };

    new Article(newArticle)
      .save()
      .then(item => res.json(item))
      .catch(error => res.status(400).json(error));
  }
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
    .then(newArticle => res.json({ message: 'Upvote successfull', data: newArticle }))
    .catch(error => {
      console.log(error);
      res.status(400).json({ error: error });
    });
});

module.exports = router;

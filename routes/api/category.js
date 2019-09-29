const _ = require('lodash');
const express = require('express');
const router = express.Router();

//Model
const Category = require('../../models/category.model');

// @route GET api/categories
// @desc GET all Category from DB
router.get('/', (req, res) => {
  Category.find()
    .sort({
      name: 1 //asc
    })
    .then(allCategories => res.json(allCategories))
    .catch(() => res.status(400));
});

// @route POST api/categories
// @desc Create one Category on DB
router.post('/', (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    metaTags: req.body.metaTags
  });

  newCategory
    .save()
    .then(item => res.json(item))
    .catch(error => res.status(400).json(error));
});

// @route POST api/categories
// @desc Create one Category on DB
router.post('/update', (req, res) => {
  const newName = req.body.name;
  const newMetaTags = req.body.metaTags;
  const categoryId = req.body.categoryId;

  if (_.isNil(categoryId)) {
    return res.status(400).json({ error: 'Missing categoryId' });
  }

  Category.findById(categoryId)
    .then(oldCategory => oldCategory.updateCategory(newName, newMetaTags))
    .then(newCategory => {
      res.json({
        message: 'Category Updated successfully.',
        data: newCategory
      });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ error: error });
    });
});

module.exports = router;

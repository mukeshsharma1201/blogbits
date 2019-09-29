const express = require('express');
const router = express.Router();

//Model
const User = require('../../models/user.model');

// @route GET api/users
// @desc GET all Users list from DB
router.get('/', (req, res) => {
  User.find()
    .sort({
      name: 1 //Asc
    })
    .then(allUsers => res.json(allUsers))
    .catch(() => res.status(400));
});

// @route POST api/articles
// @desc Create one Article on DB
router.post('/', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    role: req.body.role,
    authtoken: req.body.authtoken
  });

  newUser
    .save()
    .then(item => res.json(item))
    .catch(error => res.status(400).json(error));
});

module.exports = router;

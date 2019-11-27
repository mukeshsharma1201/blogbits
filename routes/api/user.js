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

// @route GET api/users
// @desc GET all Users list from DB
router.get('/:uid', (req, res) => {
  const uid = req.params.uid;

  User.findOne({ uid })
    .then(user => res.json(user))
    .catch(() => res.status(400));
});

// @route POST api/articles
// @desc Create one Article on DB
router.post('/', (req, res) => {
  let newUser = {
    name: req.body.name,
    username: req.body.username,
    uid: req.body.uid,
    provider_pic: req.body.provider_pic,
    role: req.body.role,
    authtoken: req.body.authtoken
  };

  User.findOneAndUpdate(
    { uid: newUser.uid },
    { $set: { name: newUser.name, authtoken: newUser.authtoken } },
    { new: true },
    function(error, result) {
      if (!error) {
        // If the document doesn't exist
        if (!result) {
          // Create it
          newUser = new User(newUser);
          // Save the document
          newUser
            .save()
            .then(item => res.json(item))
            .catch(error => res.status(400).json(error));
        } else {
          User.findOne({ uid: req.body.uid })
            .then(user => res.json(user))
            .catch(() => res.status(500));
        }
      } else {
        console.log('Error while adding user.');
      }
    }
  ).catch(error => res.status(400).json(error));
});

module.exports = router;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  provider_pic: {
    type: String,
    required: false
  },
  uid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  role: {
    type: String,
    required: false,
    trim: true
  },
  authtoken: {
    type: String,
    required: false
  }
});

userSchema.method.updateAuthToken = function(newToken) {
  this.authtoken = newToken;
  return this.save();
};

//Automatically creates a Colection named 'comments' (plural) and push this document into it.
const User = mongoose.model('user', userSchema);
module.exports = User;

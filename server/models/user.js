const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
  email:{
    type: 'String',
    required: true,
    minlength: 10,
    trim: true,
    unique: true,
    validate: {
      validator : validator.isEmail,
      message : "{VALUE} is not a valid message"
    }
  },
  password:{
    type: 'String',
    required: true,
    minlength: 6
  },
  tokens:[{
    access:{
        type: 'String',
        required: true
    },
    token:{
        type: 'String',
        required: true
    }
  }]
});

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
};

userSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(),access},'123ABC').toString();
  user.tokens.push({access,token});
  return user.save().then(() => {
    return token;
  });
};

var User = mongoose.model('UserDetail',userSchema);

// var userDetail = new User({
//   email:'  abcdef@ymail.com            '
// });
//
// userDetail.save().then((result) => {
//   console.log('Sucess :',result);
// },(err) => {
//   console.log('Unable to save',err);
// });

module.exports = {
  User
};

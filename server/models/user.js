const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

userSchema.statics.findByToken = function (token) {
  var user = this;
  var decoded;

  try{
    decoded = jwt.verify(token,'123ABC');
  }catch(e){
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  return user.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });
};

userSchema.pre('save',function (next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10,(e, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err){
          next();
        }else{
          user.password = hash;
          next();
        }
      });
    });
  }else{
    next();
  }
});

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

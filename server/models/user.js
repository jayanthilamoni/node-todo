var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email:{
    type: 'String',
    required: true,
    minlength: 10,
    trim: true
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

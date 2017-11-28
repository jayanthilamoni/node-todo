const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/User');

var id = '5a1a84e708b0c70bfc060ba6';

if(!ObjectID.isValid(id)){
  console.log('Not a valid ID');
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Find returns :',todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Find One returns :',todo);
// });
//
// Todo.findById(id).then((todo) => {
//   console.log('Find By ID :',todo);
// });

User.findById(id).then((user) => {
  if(!user){
    return console.log('ID doesnot exist');
  }
  console.log('User by ID :',user);
});

User.findOne({
  _id: id
}).then((user) => {
  if(!user){
    return console.log('ID doesnot exist');
  }
  console.log('User by Find One :',user);
});

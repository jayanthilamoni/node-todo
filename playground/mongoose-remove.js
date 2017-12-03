const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/User');

// User.remove({}).then((result) => {
//   console.log(result);
// });

User.findOneAndRemove({_id:'5a24401f164787b33ccc46a9'}).then((todo) => {
  console.log(todo);
});

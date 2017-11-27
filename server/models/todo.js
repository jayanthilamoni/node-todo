var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
  note:{
    type:'String',
    required: true,
    minlength: 1
  },completed:{
    type:'Boolean',
    default: false
  },completedAt:{
    type:'Number',
    default:000
  }
});

// var newTodo = new Todo({
//     note: 'Get Cap',
//     completed: false,
//     completedAt:269
// });

module.exports = {
  Todo
};

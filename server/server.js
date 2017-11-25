const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Todos');

var Todo = mongoose.model('Todo',{
  note:{
    type:'String'
  },completed:{
    type:'Boolean'
  },completedAt:{
    type:'Number'
  }
});

var newTodo = new Todo({
  note: 'Buy soap',
  completed: false
});

newTodo.save().then((result) => {
  console.log('Sucess :',result);
},(err) => {
  console.log('Unable to save',err);
});

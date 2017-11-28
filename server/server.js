const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  var todo = new Todo({
    note: req.body.title,
    completed:req.body.completed,
    completedAt:req.body.completedAt
  });

  todo.save().then((doc) => {
    res.send(doc);
  },(e) => {
    res.status(400).send(e);
  });
});

app.get('/todos',(req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  },(e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Error 404');
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
        return res.status(400).send('To do Not found');
    }
    res.send(todo);
  },(e) => {
    res.status(404).send('Error 404');
  }).catch((e) => {
    res.status(404).send('Error Occured');
  });
});

app.listen(3000,() => {
  console.log('App started at port 3000');
});

module.exports = {
  app
};

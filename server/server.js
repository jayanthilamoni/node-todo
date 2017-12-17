require('./config/config');

const _ = require('lodash');
const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
app.use(bodyParser.json());

const port = process.env.PORT;

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

app.delete('/todos/:id',(req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Error 404');
  }
  Todo.findByIdAndRemove(id).then((todo) => {
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

app.patch('/todos/:id',(req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['note','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Error 404');
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id,{
    $set:body
  },{new: true}).then((todo) => {
    if(!todo){
        return res.status(400).send('To do Not found and Not updated');
    }
    res.send(todo);
  },(e) => {
    res.status(404).send('Error 404');
  }).catch((e) => {
    res.status(404).send('Error Occured');
  });
});

app.post('/user',(req, res) => {
  var body = _.pick(req.body,['email','password']);
  var newUser = new User(body);
  newUser.save().then(() => {
    return newUser.generateAuthToken();
  }).then((token) => {
    res.header('x-auth',token).send(newUser);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.listen(port,() => {
  console.log(`App started at port ${port}`);
});

module.exports = {
  app
};

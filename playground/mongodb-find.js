//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Todos', (err, db) => {
  if(err){
    console.log('Unable to connect to MongoDB Server');
  }else{
    console.log('Connected to MongoDB');
  }

  // db.collection('TodoApp').find().count().then((docs) => {
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log('Unable to fetch values');
  // });

  // db.collection('users').find({age: 23}).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log('Unable to fetch values');
  // });

  db.collection('TodoApp').findOneAndDelete({_id:new ObjectID("5a1946c15767a6b767969ccf")}).then((result) => {
    console.log(JSON.stringify(result,undefined,2));
  },(err) => {
    console.log('Unable to fetch values');
  });

  //db.close();
});

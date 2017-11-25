//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Todos', (err, db) => {
  if(err){
    console.log('Unable to connect to MongoDB Server');
  }else{
    console.log('Connected to MongoDB');
  }

  // db.collection('TodoApp').findOneAndUpdate(
  // {
  //   _id: new ObjectID("5a171edd13124b1eb4d1f8f4")
  // },
  // {
  //   $set:{
  //     notes:'Done with notes'
  //   }
  // },
  // {
  //   returnOriginal:false
  // }).then((result) => {
  //   console.log(JSON.stringify(result,undefined,2));
  // });

  db.collection('users').updateMany(
  {
    name: 'Jay'
  },
  {
    $inc:{
      age:5
    }
  }).then((result) => {
    console.log(JSON.stringify(result,undefined,2));
  });

});

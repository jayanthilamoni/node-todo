const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Todos', (err, db) => {
  if(err){
    console.log('Unable to connect to MongoDB Server');
  }else{
    console.log('Connected to MongoDB');
  }

  // db.collection('TodoApp').insertOne({
  //   title: 'New Notes',
  //   notes: 'New collection'
  // },(err, result) => {
  //   if(err){
  //     console.log('Unable to create/insert into collection',err);
  //   }else{
  //     console.log(JSON.stringify(result.ops,undefined,2));
  //   }
  // });
  db.collection('users').insertOne({
    name: 'Ram',
    age: 25
  },(err, result) => {
    if(err){
      console.log('Unable to create/insert into collection',err);
    }else{
      console.log(JSON.stringify(result.ops,undefined,2));
    }
  });
  db.close();
});

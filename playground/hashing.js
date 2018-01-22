const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123jaya';

bcrypt.genSalt(10,(err, salt) => {
  bcrypt.hash(password, salt, (e ,hash) => {
    console.log(hash);
  });
});

var hashPass = '$2a$10$R0gRPz7lrMz5DHxArdAXXOnEvDBnsFpHlUaLr7c8x1GOPlp6TUq/2';

bcrypt.compare(password, hashPass ,(e, res) => {
  console.log(res);
});



// var message = {
//   id:4,
//   Note:'Hello World'};
// //var hash = SHA256(message).toString();
//
// var token = jwt.sign(message,'123ABC');
//
// var decoded = jwt.verify(token,'123ABC');
//
// console.log(token);
//
// console.log('Decoded:',decoded);

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

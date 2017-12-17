const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');



var message = {
  id:4,
  Note:'Hello World'};
//var hash = SHA256(message).toString();

var token = jwt.sign(message,'123ABC');

var decoded = jwt.verify(token,'123ABC');

console.log(token);

console.log('Decoded:',decoded);

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

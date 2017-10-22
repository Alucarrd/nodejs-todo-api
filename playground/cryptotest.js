var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');


/*
var stringData = JSON.stringify({id: this.get('id'), type: type})
//in most of hte time, type is authentication instead of generate token for resetting pwd
var encryptData = cryptojs.AES.encrypt(stringData, 'abc123!@#' ).toString();
var token = jwt.sign({
	token: encryptData
}, 'randomPwd');
return token;


console.log('I am looking for myself using token:' + token);
var decodedJWT = jwt.verify(token, 'randomPwd');
console.log('my token is ' + decodedJWT.token);

var bytes = cryptojs.AES.decrypt(decodedJWT.token, 'abc123!@#');
//json.parse takes a string and parse it into json object
console.log('I just decrypted...');
console.log('sneak preview:' + bytes.toString(cryptojs.enc.UTF8));
var tokenData = JSON.parse(bytes.toString(cryptojs.enc.UTF8));


console.log('here is my token data:' + tokenData);

*/

var myEncryptPwd = 'abc123!@#' ;
var mySignedPwd = 'randomPwd';
var stringData = JSON.stringify({id: 1, type: 'Auth'});
console.log('my string data is ' + stringData);
var encryptData = cryptojs.AES.encrypt(stringData,myEncryptPwd ).toString();
console.log('my encrypted data is ' + encryptData);

var token = jwt.sign({ token: encryptData}, mySignedPwd);

console.log('my signed token is ' + token);

var mydecodedJWT = jwt.verify(token, mySignedPwd);
var myBytes = cryptojs.AES.decrypt(mydecodedJWT.token, myEncryptPwd);
console.log('i am decrypting: ' + myBytes.toString(cryptojs.enc.Utf8));


//load all the modules from sequelize and be loaded into server.js

var Sequelize = require('sequelize');
//in the javascript object, we are going to tell it to use sqlite database and where in the db
var sequelize = new Sequelize(undefined, undefined, undefined, { //database, username, pwd
	'dialect': 'sqlite',
	'storage': __dirname + '/data/dev-todo-api.sqlite'
});

var db = {};

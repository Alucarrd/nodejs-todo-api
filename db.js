//load all the modules from sequelize and be loaded into server.js

var Sequelize = require('sequelize');

var env = process.env.NODE_ENV || "development";

var sequalize;

if(env === 'production'){
	sequelize = new Sequelize(process.env.DATABASE_URL,{
		'dialect' : 'postgres'
	});
}else{
	sequelize = new Sequelize(undefined, undefined, undefined, { //database, username, pwd
 	'dialect': 'sqlite',
 	'storage': __dirname + '/data/dev-todo-api.sqlite'
	 });

}

// //in the javascript object, we are going to tell it to use sqlite database and where in the db
// var sequelize = new Sequelize(undefined, undefined, undefined, { //database, username, pwd
// 	'dialect': 'sqlite',
// 	'storage': __dirname + '/data/dev-todo-api.sqlite'
// });

var db = {};
//time to load into all the sequelize objects

//this helps us load in sequelize model from other folders
db.todo = sequelize.import(__dirname + '/models/todo.js');

db.sequelize = sequelize; //sequelize instance
db.Sequelize - Sequelize; //Sequelize library

module.exports = db;



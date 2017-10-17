var Sequelize = require('sequelize');
//in the javascript object, we are going to tell it to use sqlite database and where in the db
var sequelize = new Sequelize(undefined, undefined, undefined, { //database, username, pwd
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});


var Todo = sequelize.define('todo', {
	description:{
		type:Sequelize.STRING,
		allowNull: false,
		validate:{
			len:[1:250] //length needs to be >=1 and <=250 
		}
	},
	completed:{
		type:Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});


//sequelize.sync().then(function(){
sequelize.sync({force: true}).then(function(){ //force: true will wipe the database upon restart
	console.log('Everything is sync-ed');

	Todo.create({
		description: 'Walk my dog',
		completed: false
	}).then(function(todo){
		// console.log('Finished');
		// console.log(todo);
		return Todo.create({
			description: 'Clean office'
		});
	}).then(function(){
		//return Todo.findById(1);
		return Todo.findAll({
			where:{
				description:{
					$like: '%trash%'
				}
			}
		});
	}).then(function(todos){
		if(todos){
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			});
			
		}else
		{
			console.log('no todo found');
		}
	}).catch(function(e){ //catch the error
		console.log(e);
	});

	Todo.findAll({
		where:{
			id: 1
		}
	}).then(function(todo){
		if(todo){
			console.log(todo);
		}
		else{
			console.log('Not found');
		}
	});

	OR

	Todo.findById(2).then(function(todo){
		if(todo){
			console.log(todo.toJSON());
		}
		else{
			console.log('Not found');
		}
	})
});
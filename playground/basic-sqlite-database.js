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



var User = sequelize.define('user', {
	email: Sequelize.STRING

});
//todo takes a model where the todo belongs to

//defining many to one and one to many
//This is how sequelize setup FK
Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync().then(function(){


	console.log('everything sync-ed');

	//now test

	// User.create({
	// 	email: 'peter@test.com'
	// }).then(function(){
	// 	return Todo.create({
	// 		description: 'clean yard'
	// 	})
	// }).then(function(todo){
	// 	User.findById(1).then(function(user){
	// 		user.addTodo(todo);//where addTodo is sequelize's feature to add the todo association
	// 	})
	// });

	//sequelize has get method and follow by model name, that will get all the items that's associated to the given entity
	User.findById(1).then(function(user){
		user.getTodos().then(function(todos){
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			});
		});
	});

	User.findById(1).then(function(user){
		user.getTodos({
			where: {
				completed: false
			}
		}).then(function(todos){
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			});
		});
	});


});

// //sequelize.sync().then(function(){
// sequelize.sync({force: true}).then(function(){ //force: true will wipe the database upon restart
// 	console.log('Everything is sync-ed');

// 	Todo.create({
// 		description: 'Walk my dog',
// 		completed: false
// 	}).then(function(todo){
// 		// console.log('Finished');
// 		// console.log(todo);
// 		return Todo.create({
// 			description: 'Clean office'
// 		});
// 	}).then(function(){
// 		//return Todo.findById(1);
// 		return Todo.findAll({
// 			where:{
// 				description:{
// 					$like: '%trash%'
// 				}
// 			}
// 		});
// 	}).then(function(todos){
// 		if(todos){
// 			todos.forEach(function(todo){
// 				console.log(todo.toJSON());
// 			});
			
// 		}else
// 		{
// 			console.log('no todo found');
// 		}
// 	}).catch(function(e){ //catch the error
// 		console.log(e);
// 	});

// 	Todo.findAll({
// 		where:{
// 			id: 1
// 		}
// 	}).then(function(todo){
// 		if(todo){
// 			console.log(todo);
// 		}
// 		else{
// 			console.log('Not found');
// 		}
// 	});

// 	OR

// 	Todo.findById(2).then(function(todo){
// 		if(todo){
// 			console.log(todo.toJSON());
// 		}
// 		else{
// 			console.log('Not found');
// 		}
// 	})
// });
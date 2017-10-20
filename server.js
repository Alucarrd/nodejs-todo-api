var express = require('express');

var bodyParser = require('body-parser');

var _ = require("underscore");

var db = require('./db.js');

var app = express();

var PORT = process.env.PORT || 3000

var todo = [];
// var todo = [{
// 	id: 1,
// 	description: "Meet mom for lunch",
// 	completd: false, 
// 	}, {
// 		id: 2,
// 		description: "Go to Market",
// 		completed: false

// 	}, {
// 		id: 3,
// 		description: "Take class Tonight",
// 		completed: true
// 	}];

// app.get('/', function(req, res){
// 	res.send('To Do API');

// });

var todoNextId = 1;

app.use(bodyParser.json());//now when we get a json in the request, we will be able to parse it


// //GET /todos?completed=true
// //GET /todos?completed=true&q=dog //where q is query parameter to search in description
// app.get('/todos', function(req, res){
// 	var queryParams = req.query;
// 	var filteredTodos = todos;
// 	if(queryParams.hasOwnProperty('completed') && (queryParams.completed === 'true' || queryParams.completed === 'false')){
// 		filteredTodos = _.where(filteredTodos, {completed: JSON.parse(queryParams)});
// 	}	
// 	//if has property && completed = true
// 	//	called filteredTodos = _.where
// 	//else if has prop && completed if 'false'

// 	if(queryParams.hasOwnProperty('q') && queryParams.q.trim().length > 0){
// 		filteredTodos = _.filter(filteredTodos, function(obj){
// 			return obj.description.toLowerCase().indexOf(queryParams.q.toLowerCase().trim()) >= 0;

// 		});
// 	}
// 		//use _.filter

// 	res.json(filteredTodos); //converting to json	
// });

//GET /todos?completed=true
//GET /todos?completed=true&q=dog //where q is query parameter to search in description
app.get('/todos', function(req, res){
	var query = req.query;
	var where = {};
	if(query.hasOwnProperty('completed') && (query.completed === 'true' || query.completed === 'false')){
			where.completed=query.completed;
	}
	if(query.hasOwnProperty('q') && query.q.trim().length > 0){
		where.description = {
			$like : '%' + query.q + '%'
		};
	}
	return db.todo.findAll({where : where}).then(function(todos){
			
		res.json(todos.toJSON());
		
			
	}, function(e){
		res.status(500).send(e);
	});


});



//GET /todos/:id ie /todos/1
//This version is for without db
// app.get('/todos/:id', function(req, res){
// 	var todoId = parseInt(req.params.id, 10);
// 	//iterate of todos array, find the match

// 	//if not, repl: res.status(404).send();
	

// 	//refactoring using underscore for better maintenance
// 	// todo.forEach(function(todo){
// 	// 	if(todoId === todo.id){;
// 	// 		myItem = todo;
// 	// 	}
// 	// });
// 	var matchTodo = _.findWhere(todo, {id: todoId}) //return the first one matched

// 	if(matchTodo)
// 		res.json(matchTodo);
// 	else
// 		res.status(404).send();
	
// });
//GET /todos/:id ie /todos/1
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	//iterate of todos array, find the match

	//if not, repl: res.status(404).send();
	

	//refactoring using underscore for better maintenance
	// todo.forEach(function(todo){
	// 	if(todoId === todo.id){;
	// 		myItem = todo;
	// 	}
	// });
	db.todo.findById(todoId).then(function(todo){
		if(!!todo){
			res.json(todo.toJSON());
		}
		else{
			return res.status(404).send();
		}
		
	}, function(e){
		res.status(500).send(e);
	});
	// var matchTodo = _.findWhere(todo, {id: todoId}) //return the first one matched

	// if(matchTodo)
	// 	res.json(matchTodo);
	// else
	// 	res.status(404).send();
	
});



//POST /todos/
app.post('/todos', function(req, res){
//use _.pick to pick only the description and completed
	var body = _.pick(req.body, "description", "completed");

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}
	db.todo.create(body).then(function(todo){
		res.json(todo.toJSON()); //todo is sequelize, has a lot of sequelize method
	}, function(e){
		res.status(400).json(e);
	});
	//call create on db.todo
	//	respond to api call with 200 and todo object
	//	else send back error





//set body.description to trim
//comment this out to convert into database
	// todo.push({ "id" : todoNextId,
	// 			"description" : body.description.trim(),
	// 			"completed" : body.completed});
	// todoNextId++;
	//use db.todo.create

	//res.json(body);
});


//DELETE /todos/:id
//user _.without()
app.delete('/todos/:id', function(req, res){
	
	var todoId = parseInt(req.params.id, 10);
	db.todo.destroy({
				where:{
					id:todoId
			}).then(function(rowsDeleted){
				if(rowsDeleted === 0){
					res.status(404).json({
						error: 'No todo with id'
					});

				}else{
					res.status(204).send(); //204 means everything works well and nothing to send back
				}
			}, function(e){
				res.status(500).send(e);
			});


});

//PUT /todos/:id

app.put('/todos/:id', function(req, res){
	var body = _.pick(req.body, "description", "completed");
	var validAttribute = {};
	console.log('my property of id is:' + req.params.id);
	var todoId = parseInt(req.params.id, 10);
	var matchTodo = _.findWhere(todo, {id: todoId});
	//to do validation

	if(!matchTodo){
		return res.status(400).send();
	}

	//body.hasOwnProperty('completed')
	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttribute.completed = body.completed;
	}else if(body.hasOwnProperty('completed')){
		return res.status(400).send();

	}else{
		//never provided attribute, no problem here
	}

	if(body.hasOwnProperty('description') && _isString(body.description) && body.description.trim().length > 0){
		validAttribute.description = body.description;
	}else if(body.hasOwnProperty('description'))
	{
		return res.status(400).send();
	}
	else{

	}

	//_.extend()
	//object in javascript are being passed around by reference
	_.extend(matchTodo, validAttribute);

	return rres.json(matchTodo);

	

});

db.sequelize.sync().then(function(){
	app.listen(PORT, function(){
	console.log("Express listening on port " + PORT + "!");
	});

});



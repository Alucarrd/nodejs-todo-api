var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var PORT = process.env.PORT || 3000

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


//GET /todos 
app.get('/todos', function(req, res){
	res.json(todo); //converting to json	
});

//GET /todos/:id ie /todos/1

app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id);
	//iterate of todos array, find the match

	//if not, repl: res.status(404).send();
	
	var myItem;
	todo.forEach(function(todo){
		if(todoId === todo.id){;
			myItem = todo;
		}
	});
	if(myItem)
		res.json(myItem);
	else
		res.status(404).send();
	
});

//POST /todos/
app.post('/todos', function(req, res){
	var body = req.body
	console.log('description');

	res.json(body);
})




app.listen(PORT, function(){
	console.log("Express listening on port " + PORT + "!");
});


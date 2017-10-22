
//reason why we want to export a function rather than object is because we can have other files to pass in configuration data
module.exports = function(db){
	//we want to return an object that could be any piece of middleware
	return {
		//we want to pass in the token, decrypt, and pass the data back
		//middleware's run before the route handler

		requireAuthentication :function(req, res, next){
			//get the Auth token off the header
			var token = req.get('Auth');
			//we wnat to find user with db value
			db.user.findByToken(token).then(function(user){
				req.user = user; //now we can access req.user in our code and do all sort of thing with that user
				next();
			}, function(e){
				res.status(401).send();
			});
		}


	};

};
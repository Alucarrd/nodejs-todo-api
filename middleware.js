var cryptojs = require('crypto-js');
//reason why we want to export a function rather than object is because we can have other files to pass in configuration data
module.exports = function(db){
	//we want to return an object that could be any piece of middleware
	return {
		//we want to pass in the token, decrypt, and pass the data back
		//middleware's run before the route handler

		requireAuthentication :function(req, res, next){
			//get the Auth token off the header
			var token = req.get('Auth') || ''; //set it to empty string if there's no auth in header
			console.log('my auth token is:' + token);
			//we wnat to find user with db value

			//code commented out as functionality evolved
			// db.user.findByToken(token).then(function(user){
			// 	console.log('I found myself');
			// 	req.user = user; //now we can access req.user in our code and do all sort of thing with that user
			// 	next();
			// }, function(e){
			// 	console.log('I cannot find not found');
			// 	res.status(401).send();
			// });

			db.token.findOne(
			{
				where: {
					tokenHash : cryptojs.MD5(token).toString();
				}
			}).then(function(tokenInstsance){
				if(!tokenInstsance)
					throw new Error();

				//if there's a token, then save it to the request object
				req.token = tokenInstsance;
				return db.user.findByToken(tokenInstsance); //by returning it, we can keep the promise chain alive

			}).then(function(user){
				req.user = user;
				next();
			}).catch(function(){
				res.status(401).send();
			});
		}


	};

};
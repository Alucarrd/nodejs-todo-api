var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');
module.exports = function(sequelize, DataTypes){
//this is the specific format being passed through sequelize

	//return sequelize.define('user', { //for model, use lowercase singular names
		var user = sequelize.define('user', {
		email:{
			type:DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate:{
				//len:[1,250] //length needs to be >=1 and <=250 
				isEmail: true
			}
		},
		salt:{
			type: DataTypes.STRING
		},
		password_hash: {
			type: DataTypes.STRING
		},
		password:{
			type:DataTypes.VIRTUAL, //custom data type, this means this is a generated password
			allowNull: false,
			validate: {
				len:[7, 100]
				//you can use validate to force alphanumeric
			},
			set: function(value){
				var salt = bcrypt.genSaltSync(10); //takes in the number of salt char you want to create
				var hashedPassword = bcrypt.hashSync(value, salt);

				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash', hashedPassword);

			}
		}
	}, {
			hooks : { //this is where we can sanitize input
				beforeValidate: function(user, options){
					//take user.email to lowercase only if it's a string
					if(typeof user.email === 'string'){
						user.email = user.email.toLowerCase();
					}
				}
			},
			classMethods: {
				authenticate: function(body){
					return new Promise(function(resolve, reject){

					if(!_.isString(body.email) || !_.isString(body.password) || body.email.trim().length === 0 ||body.password.trim().length === 0  ){
						//return res.status(400).send();
						//since this is a class method now, we just wnat to return reject
						return reject();
					}

					//use db.user.findOne
					user.findOne({where: { email : body.email}}).then(function(user){
						if(!user || !bcrypt.compareSync(body.password, user.get('password_hash'))){
							//return res.status(401).send(); //401 means authentication is possible but failed
							return reject();
						}
						//res.json(user.toPublicJSON());
						return resolve(user);
					}, function(e){
						//return res.status(500).send();
						return reject();
					});
	
					});
				},
				findByToken: function(token){
					return new Promise(function(resolve, reject){
						//we are going to decrypt the token then decode the data
						try{
							//jwt.verify will verify if the token's been verified
							var decodedJWT = jwt.verify(token, 'randomPwd');
							var bytes = cryptojs.AES.decrypt(decodedJWT.token, 'abc123!@#');
							//json.parse takes a string and parse it into json object

							var tokenData = JSON.parse(bytes.toString(cryptojs.enc.UTF8));
							user.findById(tokenData.id).then(function(user){
								if(user)
									resolve(user);
								else
									reject();
								
							}, function(e){
								reject();
							});
						}
						catch(e){
							console.error(e);
							reject();
						}
					});
				}
			},
			instanceMethods: { //an object
				toPublicJSON: function(){
					var json = this.toJSON(); //this refers instance
					return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
				},
				generateToken: function(type){
					if(!_.isString(type))
						return undefined;
					try{
						//take user data (id and token type) and encrypt that
						var stringData = json.stringify({id: this.get('id'), type: type})
						//in most of hte time, type is authentication instead of generate token for resetting pwd
						var encryptData = cryptojs.AES.encrypt(stringData, 'abc123!@#' ).toString();
						var token = jwt.sign({
							token: encryptData
						}, 'randomPwd');
						return token;
					}
					catch(e){
						//easier to see error
						console.error(e);
						return undefined; //if there's no valid info, then just return undefined
					}
				}
			}
		

	});

return user;

};
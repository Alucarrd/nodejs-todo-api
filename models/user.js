var bcrypt = require('bcrypt');
var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
//this is the specific format being passed through sequelize

	return sequelize.define('user', { //for model, use lowercase singular names
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
			instanceMethods: { //an object
				toPublicJSON: function(){
					var json = this.toJSON(); //this refers instance
					return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
				}
			}
		

	});



};
module.exports = function(sequelize, DataTypes){
//this is the specific format being passed through sequelize

	return sequelize.define('todo', {
		description:{
			type:DataTypes.STRING,
			allowNull: false,
			validate:{
				len:[1,250] //length needs to be >=1 and <=250 
			}
		},
		completed:{
			type:DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}

	});



};
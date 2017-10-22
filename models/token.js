//we are going to store hashed version of token

var cryptojs = require('crypto-js');

module.exports = function(sequelize, DataTypes){

	return sequelize.define('token', {
		token : {
			type: DataTypes.VIRTUAL,
			allowNull: false,
			validate:{
				len: [1]
			},
			set: function(value){
				var hash = cryptojs.MD5(value).toString();
				this.setDataValue('token', value);
				this.setDatavalue('tokenHash', hash);
			}
		},
		tokenHash : DataTypes.STRING



	});

}
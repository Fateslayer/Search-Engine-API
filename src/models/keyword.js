// Load Modules
const { Model, DataTypes } = require('sequelize');

// Create Model
class Keyword extends Model {}

// Export Model Builder
module.exports = sequelize => {
	// Setup Schema
	Keyword.init(
		{
			word: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{ sequelize, modelName: 'keyword' }
	);

	// Setup Associations
	Keyword.associate = ({ Link }) => {
		// Many-To-Many Association With Page Model
		Keyword.belongsToMany(Link, {
			through: 'index',
		});
	};

	// Return Model
	return Keyword;
};

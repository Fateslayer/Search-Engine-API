// Load Modules
const { Model, DataTypes } = require('sequelize');

// Create Model
class Page extends Model {}

// Export Model Builder
module.exports = sequelize => {
	// Setup Schema
	Page.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			text: {
				type: DataTypes.CITEXT,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{ sequelize, modelName: 'page' }
	);

	// Setup Associations
	Page.associate = ({ Link, Keyword }) => {
		// One-To-One Association With Link Model
		Page.belongsTo(Link);

		// Many-To-Many Association With Keyword Model
		Page.belongsToMany(Keyword, {
			through: 'index',
		});
	};

	// Return Model
	return Page;
};

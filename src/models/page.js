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
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{ sequelize, modelName: 'page' }
	);

	// Setup Associations
	Page.associate = ({ Link }) => {
		// One-To-One Association With Link Model
		Page.belongsTo(Link);
	};

	// Return Model
	return Page;
};

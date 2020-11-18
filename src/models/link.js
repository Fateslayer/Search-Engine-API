// Load Modules
const { Model, DataTypes } = require('sequelize');

// Create Model
class Link extends Model {}

// Export Model Builder
module.exports = sequelize => {
	// Setup Schema
	Link.init(
		{
			link: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isUrl: true,
				},
			},
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
			rank: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
		},
		{ sequelize }
	);

	// Return Model
	return Link;
};

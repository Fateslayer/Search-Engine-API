// Load Modules
const { Model, DataTypes } = require('sequelize');

// Create Model
class Keyword extends Model {}

// Export Model Builder
module.exports = sequelize => {
	// Setup Schema
	Keyword.init(
		{
			keyword: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{ sequelize }
	);

	// Return Model
	return Keyword;
};

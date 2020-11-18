// Load Modules
const { Model, DataTypes } = require('sequelize');

// Create Model
class Crawl extends Model {}

// Export Model Builder
module.exports = sequelize => {
	// Setup Schema
	Crawl.init(
		{
			link: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isUrl: true,
				},
			},
			status: {
				type: DataTypes.ENUM,
				allowNull: false,
				values: ['CRAWL', 'CRAWLING'],
				defaultValue: 'CRAWL',
			},
		},
		{ sequelize }
	);

	// Return Model
	return Crawl;
};

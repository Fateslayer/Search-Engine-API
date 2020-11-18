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
				isUrl: true,
				unique: true,
				allowNull: false,
				type: DataTypes.STRING,
			},
			status: {
				allowNull: false,
				type: DataTypes.ENUM,
				defaultValue: 'CRAWL',
				values: ['CRAWL', 'CRAWLING'],
			},
		},
		{ sequelize }
	);

	// Return Model
	return Crawl;
};

// Load Modules
const { Model, DataTypes } = require('sequelize');

// Create Model
class Link extends Model {}

// Export Model Builder
module.exports = sequelize => {
	// Setup Schema
	Link.init(
		{
			address: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isUrl: true,
				},
			},
			rank: {
				type: DataTypes.DOUBLE,
				allowNull: false,
				defaultValue: 0,
			},
			status: {
				type: DataTypes.ENUM,
				allowNull: false,
				values: ['CRAWL', 'CRAWLING', 'CRAWLED'],
				defaultValue: 'CRAWL',
			},
		},
		{ sequelize, modelName: 'link' }
	);

	// Setup Associations
	Link.associate = ({ Page }) => {
		// One-To-One Association With Page Model
		Link.hasOne(Page);

		// Many-To-Many Association With Self
		Link.belongsToMany(Link, {
			through: 'childLinks',
			as: 'child',
			foreignKey: 'parentId',
		});
		Link.belongsToMany(Link, {
			through: 'childLinks',
			as: 'parent',
			foreignKey: 'childId',
		});
	};

	// Return Model
	return Link;
};

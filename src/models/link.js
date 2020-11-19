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

	// Setup Associations
	Link.associate = db => {
		// Many-To-Many Association With Keyword Table
		Link.belongsToMany(db.Keyword, { through: 'Index' });

		// Many-To-Many Association With Self
		Link.belongsToMany(Link, {
			through: 'Referrer',
			as: 'Parent',
			foreignKey: 'parentLinkId',
		});
		Link.belongsToMany(Link, {
			through: 'Referrer',
			as: 'Child',
			foreignKey: 'childLinkId',
		});
	};

	// Return Model
	return Link;
};

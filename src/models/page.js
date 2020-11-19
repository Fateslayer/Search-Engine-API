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
		{ sequelize }
	);

	// Setup Associations
	Page.associate = ({ Link, Keyword }) => {
		// One-To-One Association With Link Model
		Page.belongsTo(Link, {
			as: 'link',
		});

		// Many-To-Many Association With Keyword Model
		Page.belongsToMany(Keyword, {
			through: 'Index',
			as: 'page',
			foreignKey: 'pageId',
		});
	};

	// Return Model
	return Page;
};

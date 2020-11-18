'use strict';

// Load Modules
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

// Setup Constants
const basename = path.basename(__filename);
const {
	DB_HOST,
	DB_DIALECT,
	DB_DATABASE,
	DB_USERNAME,
	DB_PASSWORD,
} = process.env;
const OPTIONS = {
	host: DB_HOST,
	dialect: DB_DIALECT,
	logging: false,
};

// Initailize Database Connection
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, OPTIONS);

// Initialize Export Object
const db = {};

// Load All Models
fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js'
		);
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize);
		db[model.name] = model;
	});

// Setup Model Associations
// Object.keys(db).forEach(modelName => {
// 	if (db[modelName].associate) {
// 		db[modelName].associate(db);
// 	}
// });

// Attach Objects To Export Object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export DB Object
module.exports = db;

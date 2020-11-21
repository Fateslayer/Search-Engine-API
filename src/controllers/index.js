// Load Modules
const fs = require('fs');
const path = require('path');

// Setup Constants
const basename = path.basename(__filename);

// Initailize Controllers
const controllers = {};

// Populate Controllers
fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js'
		);
	})
	.forEach(file => {
		const controller = require(path.join(__dirname, file));
		controllers[controller.name] = controller;
	});

// Export Controllers
module.exports = controllers;

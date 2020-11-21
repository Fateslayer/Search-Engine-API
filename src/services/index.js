// Load Modules
const fs = require('fs');
const path = require('path');

// Setup Constants
const basename = path.basename(__filename);

// Initailize Services
const services = {};

// Populate Services
fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js'
		);
	})
	.forEach(file => {
		const service = require(path.join(__dirname, file));
		services[service.name] = service;
	});

// Export Services
module.exports = services;

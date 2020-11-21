// Load Modules
const fs = require('fs');
const path = require('path');
const express = require('express');

// Setup Constants
const basename = path.basename(__filename);

// Initailize Express
const app = express();

// Setup Body Parser
app.use(express.json());

// Setup Routes
fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js'
		);
	})
	.forEach(file => {
		const route = '/' + file.slice(0, -3);
		const router = require(path.join(__dirname, file));
		app.use(route, router);
	});

// Export Express Object
module.exports = app;

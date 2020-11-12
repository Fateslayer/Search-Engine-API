// Load Modules
const express = require('express');

// Load Environment Variables
require('dotenv-flow').config();

// Load Constants
const { PORT } = process.env;

// Setup Express
const app = express();

// Setup Routes
app.get('/', (req, res) => {
	res.send('hello');
});

// Start Server
app.listen(PORT);

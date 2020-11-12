// Load Modules
const express = require('express');

// Load Environment Variables
require('dotenv-flow').config();

// Load Constants
const { PORT } = process.env;

// Load Controllers
const search = require('./src/controllers/search');

// Setup Express
const app = express();

// Setup Routes
app.use('/search', search);

// Start Server
app.listen(PORT);

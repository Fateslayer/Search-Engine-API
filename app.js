// Load Environment Variables
require('dotenv-flow').config();

// Load Express
const app = require('./src/controllers');

// Load Constants
const { PORT } = process.env;

// Start Server
app.listen(PORT, () => {
	console.log(`Server Started On Port: ${PORT}`);
});

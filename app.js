// Load Environment Variables
require('dotenv-flow').config();

// Load Express
const app = require('./src/routes');

// Load Database
const { sequelize } = require('./src/models');

// Load Constants
const { PORT } = process.env;

// Start Server
app.listen(PORT, async () => {
	console.log(`Server Started On Port: ${PORT}`);

	// Sync Database With Models
	await sequelize.sync({
		// force: true,
	});
});

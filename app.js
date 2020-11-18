// Load Environment Variables
require('dotenv-flow').config();

// Load Express
const app = require('./src/controllers');

// Load Database
const { sequelize } = require('./src/models');

// Load Constants
const { PORT } = process.env;

// Start Server
app.listen(PORT, async () => {
	console.log(`Server Started On Port: ${PORT}`);

	await sequelize.sync({
		force: true,
	});
});

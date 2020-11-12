// Load Express Router
const router = require('express').Router();

// Load Services
const Search = require('../services/search');

// Setup Routes
router.get('/', async (req, res) => {
	let query = req.query.q || '';
	query = query.trim().toLowerCase();

	if (query) {
		const results = await Search.search(query);
		res.send(results);
	} else {
		res.status(400).send();
	}
});

// Export Router
module.exports = router;

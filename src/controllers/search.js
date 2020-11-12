// Load Express Router
const router = require('express').Router();

// Setup Routes
router.get('/', (req, res) => {
	let query = req.query.q || '';
	query = query.trim().toLowerCase();

	if (query) {
		res.send(query);
	} else {
		res.status(400).send();
	}
});

// Export Router
module.exports = router;

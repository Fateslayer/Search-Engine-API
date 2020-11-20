// Load Express Router
const router = require('express').Router();

// Load Services
const Crawl = require('../services/crawl');

// Setup Routes
router.post('/', async (req, res) => {
	const result = await Crawl.addLinks();
	res.send(result);
});

// Export Router
module.exports = router;

// Load Express Router
const router = require('express').Router();

// Load Services
const Crawl = require('../services/crawl');

// Setup Routes
router.post('/', async ({ body }, res) => {
	let { links } = body;

	if (Array.isArray(links)) {
		links = Crawl.getValidLinks(links);

		if (links.length > 0) {
			const result = await Crawl.addLinks(links);

			if (result) {
				res.send();
			} else {
				res.status(500).send();
			}
		} else {
			res.status(400).send();
		}
	} else {
		res.status(400).send();
	}
});

// Export Router
module.exports = router;

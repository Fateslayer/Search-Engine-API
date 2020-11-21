// Load Express Router
const router = require('express').Router();

// Load Controllers
const { Crawl } = require('../controllers');

// Extract Methods
const { crawlLinks, addLinks } = Crawl;

// Setup Routes
router.route('/').get(crawlLinks).post(addLinks);

// Export Router
module.exports = router;

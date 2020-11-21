// Load Express Router
const router = require('express').Router();

// Load Controllers
const { Crawl } = require('../controllers');

// Extract Methods
const { addLinks } = Crawl;

// Setup Routes
router.route('/').post(addLinks);

// Export Router
module.exports = router;

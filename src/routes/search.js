// Load Express Router
const router = require('express').Router();

// Load Controllers
const { Search } = require('../controllers');

// Extract Methods
const { getResults } = Search;

// Setup Routes
router.route('/').get(getResults);

// Export Router
module.exports = router;

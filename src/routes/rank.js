// Load Express Router
const router = require('express').Router();

// Load Controllers
const { Rank } = require('../controllers');

// Extract Methods
const { rankLinks } = Rank;

// Setup Routes
router.route('/').put(rankLinks);

// Export Router
module.exports = router;

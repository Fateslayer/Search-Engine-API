// Load Express Router
const router = require('express').Router();

// Setup Routes
router.get('/', (req, res) => {
	res.send('hello');
});

// Export Controller
module.exports = router;

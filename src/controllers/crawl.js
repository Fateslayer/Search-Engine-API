// Load Express Router
const router = require('express').Router();

// Setup Routes
router.post('/', async (req, res) => {
	res.send(req.body);
});

// Export Router
module.exports = router;

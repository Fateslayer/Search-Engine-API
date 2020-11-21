// Load Services
const { Search: SearchService } = require('../services');

// Create Controller
class Search {
	static async getResults(req, res) {
		let query = req.query.q || '';
		query = query.trim().toLowerCase();

		if (query) {
			const results = await SearchService.getResults(query);
			res.send(results);
		} else {
			res.status(400).send();
		}
	}
}

// Export Controller
module.exports = Search;

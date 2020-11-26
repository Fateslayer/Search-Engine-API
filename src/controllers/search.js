// Load Services
const { Search: SearchService } = require('../services');

// Create Controller
class Search {
	static async getResults(req, res) {
		let query = req.query.q || '';
		const page = Math.abs(+req.query.page || 1);
		const limit = Math.abs(+req.query.limit || 10);
		query = query.trim().toLowerCase();

		if (query) {
			const results = await SearchService.getResults(query, page, limit);
			res.send({ results });
		} else {
			res.status(400).send();
		}
	}
}

// Export Controller
module.exports = Search;

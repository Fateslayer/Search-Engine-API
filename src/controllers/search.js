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
			let results = await SearchService.getResults(query);
			const total = results.length;
			results = results.slice((page - 1) * limit, page * limit); // Apply Pagination
			res.send({ results, total });
		} else {
			res.status(400).send();
		}
	}
}

// Export Controller
module.exports = Search;

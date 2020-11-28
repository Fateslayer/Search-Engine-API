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
			let links = await SearchService.getMatchingLinks(
				query,
				page * limit // Number Of Links To Fetch For Each Keyword
			);
			const total = links.length;
			links = links.slice((page - 1) * limit, page * limit); // Apply Pagination
			const results = await SearchService.generateResults(links, query);
			res.send({ results, query, total, page, limit });
		} else {
			res.status(400).send();
		}
	}
}

// Export Controller
module.exports = Search;

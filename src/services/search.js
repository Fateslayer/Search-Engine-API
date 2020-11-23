// Load Models
const { Link, Keyword } = require('../models');

// Create Service
class Search {
	static async getResults(query) {
		const keywords = await Keyword.findAll({
			where: {
				word: query.split(' '),
			},
		});

		const all = [];

		for (const keyword of keywords) {
			const links = await keyword.getLinks({
				limit: 10,
				order: [['rank', 'DESC']],
			});

			all.push(links);
		}

		return all;
	}
}

// Export Service
module.exports = Search;

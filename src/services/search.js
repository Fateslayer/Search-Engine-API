// Load Models
const { Page, Keyword } = require('../models');

// Create Service
class Search {
	static async getResults(query) {
		const keywords = await Keyword.findAll({
			where: {
				word: query.split(' '),
			},
			include: Page,
		});

		return keywords;
	}
}

// Export Service
module.exports = Search;

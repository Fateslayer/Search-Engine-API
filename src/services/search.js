// Load Models
const { Link, Keyword } = require('../models');

// Create Service
class Search {
	static async getResults(query, page, limit) {
		const keywords = await this.getKeywordsWithLinks(query);
		let links = this.getUniqueLinksFromKeywords(keywords);
		links = this.sortLinks(links);
		links = links.slice((page - 1) * limit, page * limit); // Apply Pagination

		return links;
	}

	static async getKeywordsWithLinks(query) {
		const words = this.getUniqueWords(query);
		const keywords = await Keyword.findAll({
			where: {
				word: words,
			},
			include: [Link],
		});

		return keywords;
	}

	static getUniqueLinksFromKeywords(keywords) {
		let allLinks = {};

		keywords.forEach(({ links }) => {
			links.forEach(link => {
				if (allLinks[link.id]) {
					link.rank += 1; // Increase Rank For Link That Appears In Keywords
				}

				allLinks[link.id] = link;
			});
		});

		allLinks = Object.values(allLinks);

		return allLinks;
	}

	static sortLinks(links, field = 'rank') {
		links.sort(
			(a, b) => (a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0) // Sort In Descending Order
		);

		return links;
	}

	static getUniqueWords(query) {
		let words = {};

		query.split(' ').forEach(word => {
			words[word] = '';
		});

		words = Object.keys(words);

		return words;
	}
}

// Export Service
module.exports = Search;

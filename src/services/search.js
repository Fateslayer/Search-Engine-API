// Load Models
const { Link, Keyword } = require('../models');

// Create Service
class Search {
	static async getMatchingLinks(query) {
		const keywords = await this.getKeywordsWithLinks(query);
		let links = this.getUniqueLinksFromKeywords(keywords);
		links = this.sortLinks(links);

		return links;
	}

	static async generateResults(links, query) {
		const results = [];

		for (const link of links) {
			const page = await link.getPage();
			results.push({
				link: 'https://' + link.address,
				title: page.title,
				description: page.text,
			});
		}

		return results;
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
					link.rank *= 2; // Increase Rank For Link That Appears In Keywords
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

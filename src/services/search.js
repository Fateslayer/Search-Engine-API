// Load Models
const { Link, Keyword } = require('../models');

// Create Service
class Search {
	static async getMatchingLinks(query) {
		const keywords = await this.getKeywords(query);
		let links = await this.getUniqueLinksFromKeywords(keywords);
		links = this.sortLinks(links);

		return links;
	}

	static async generateResults(links, query) {
		const results = [];

		for (const link of links) {
			const page = await link.getPage();
			const description = this.getDescription(page.text, query);
			results.push({
				link: 'https://' + link.address,
				title: page.title,
				description,
			});
		}

		return results;
	}

	static getDescription(text, query) {
		const limit = 300;
		let description = '';
		let index = text.length;
		const words = query.split(' ');

		for (const word of words) {
			let currIndex = text.search(new RegExp(word, 'i')); // Get Index For Word

			if (currIndex !== -1) {
				let periodIndex = text.slice(0, currIndex).lastIndexOf('.') + 1;

				if (periodIndex === -1) {
					periodIndex = 0;
				}

				if (periodIndex < index) {
					index = periodIndex;
				}
			}
		}

		if (index === text.length) {
			description = text.slice(0, limit); // Set Description To First N Characters
		} else {
			description = text.slice(index, index + limit);
		}

		return description;
	}

	static async getKeywords(query) {
		const words = this.getUniqueWords(query);
		const keywords = await Keyword.findAll({
			where: {
				word: words,
			},
		});

		return keywords;
	}

	static async getUniqueLinksFromKeywords(keywords) {
		let allLinks = {};

		for (const keyword of keywords) {
			const links = await keyword.getLinks({
				order: [['rank', 'DESC']],
			});

			for (const link of links) {
				if (allLinks[link.id]) {
					link.rank *= 2; // Increase Rank For Link That Appears In Many Keywords
				}

				allLinks[link.id] = link;
			}
		}

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

// Load Models
const { Link, Keyword } = require('../models');

// Create Service
class Search {
	static async getMatchingLinks(query, limit) {
		const keywords = await this.getKeywords(query);
		let links = await this.getUniqueLinksFromKeywords(keywords, limit);
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
		let description = '';
		const limit = 400;
		const words = query.split(' ');

		for (const word of words) {
			const index = text.search(new RegExp(word, 'i')); // Get Index For First Word Match

			if (index !== -1) {
				const temp = text.slice(index, index + limit); // Get Upto 400 Characters From Index

				if (temp.length > description) {
					description = temp;
				}
			}
		}

		if (description.length === 0) {
			description = text.slice(0, limit); // Set Description To First 400 Characters If No Keyword Match
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

	static async getUniqueLinksFromKeywords(keywords, limit) {
		let allLinks = {};

		for (const keyword of keywords) {
			const links = await keyword.getLinks({
				order: [['rank', 'DESC']],
				limit,
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

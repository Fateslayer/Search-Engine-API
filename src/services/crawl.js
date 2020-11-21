// Load Modules
const validator = require('validator');

// Load Models
const { Link } = require('../models');

// Create Service
class Crawl {
	static async crawlLinks(limit) {
		let links = await Link.findAll({
			where: {
				status: 'CRAWL',
			},
			limit,
		});

		if (links.length) {
			const ids = links.map(link => link.id);

			await Link.update(
				{
					status: 'CRAWLING',
				},
				{
					where: {
						id: ids,
					},
				}
			);

			links.forEach(link => this.crawlLink(link.address));
		}

		links = links.map(link => link.address);

		return links;
	}

	static async crawlLink(address) {
		console.log(address);
	}

	static async addLinks(links) {
		links = this.transformLinksForDatabaseInsertion(links);
		const result = await Link.bulkCreate(links, {
			updateOnDuplicate: ['address'],
		});

		return result;
	}

	static getValidLinks(links) {
		links = links
			.map(link => link.toLowerCase().trim()) // Transform Links
			.filter(link => validator.isURL(link)); // Filter Valid Links

		return links;
	}

	static transformLinksForDatabaseInsertion(links) {
		// Transform Simple Array Into Array Of Objects For Bulk Create
		links = links.map(link => {
			link = link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, ''); // Remove http://, https://, www. Etc From Link

			return {
				address: link, // Address Is The Column Name Inside Link Model To Store URL's
			};
		});

		return links;
	}
}

// Export Service
module.exports = Crawl;

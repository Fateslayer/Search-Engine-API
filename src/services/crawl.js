// Load Modules
const axios = require('axios');
const cheerio = require('cheerio');
const validator = require('validator');

// Load Models
const { Link } = require('../models');

// Create Service
class Crawl {
	static async getLinksForCrawling(limit) {
		// Fetch All Links That Needs To Be Crawled (Upto Limit)
		const links = await Link.findAll({
			where: {
				status: 'CRAWL',
			},
			limit,
		});

		return links;
	}

	static async crawlLinks(links) {
		await this.setStatusOfLinks(links, 'CRAWLING'); // To Prevent Crawling The Same Links Again

		await links.forEach(async link => {
			const address = `https://${link.address}`;
			const { data } = await axios.get(address).catch(e => {
				return {};
			});

			if (data) {
				let childLinks = [];
				const $ = cheerio.load(data); // Parse HTML

				$('a').each((index, anchor) => {
					const childLink = $(anchor).attr('href');
					childLinks.push(childLink);
				});

				childLinks = await this.addLinks(childLinks); // Add Child Links For Next Crawl
				const text = $('body').text().trim(); // Get Page Text
			} else {
				await link.destroy(); // Delete Invalid Link
			}
		});

		await this.setStatusOfLinks(links, 'CRAWLED'); // To Prevent Crawling The Same Links Again
	}

	static async addLinks(links) {
		links = this.getUniqueShortLinks(links);

		if (links.length) {
			links = this.transformLinksForDatabaseInsertion(links);
			const result = await Link.bulkCreate(links, {
				updateOnDuplicate: ['address'], // Don't Update Any Field If Link Already Exists
			});

			return result;
		} else {
			return [];
		}
	}

	static async setStatusOfLinks(links, status) {
		// Extract Link ID's
		const ids = links.map(link => link.id);

		// Update All Links Status That Matches The ID's
		const result = await Link.update(
			{
				status,
			},
			{
				where: {
					id: ids,
				},
			}
		);

		return result;
	}

	static transformLinksForDatabaseInsertion(links) {
		// Transform Simple Array Into Array Of Objects For Bulk Create
		links = links.map(link => {
			return {
				address: link, // Address Is The Column Name Inside Link Model To Store URL's
			};
		});

		return links;
	}

	static getUniqueShortLinks(links) {
		const uniqueLinks = {};

		links.forEach(link => {
			if (validator.isURL(link)) {
				link = this.shortenLink(link);
				uniqueLinks[link] = '';
			}
		});

		links = Object.keys(uniqueLinks);

		return links;
	}

	static shortenLink(link) {
		link = link.trim().toLowerCase(); // Trim & LowerCase
		link = link.split(/[?#]/)[0]; // Remove Query String
		link = link.split(/\/$/)[0]; // Remove Ending Forward Slash
		link = link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, ''); // Remove 'http://', 'https://', 'www.' Etc From Link

		return link;
	}
}

// Export Service
module.exports = Crawl;

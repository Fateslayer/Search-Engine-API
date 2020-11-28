// Load Modules
const axios = require('axios');
const cheerio = require('cheerio');
const validator = require('validator');

// Load Models
const { Link, Keyword } = require('../models');

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

			try {
				if (data) {
					let childLinks = [];
					const $ = cheerio.load(data); // Parse HTML

					$('a').each((index, anchor) => {
						const childLink = $(anchor).attr('href');

						if (childLink) {
							childLinks.push(childLink);
						}
					});

					childLinks = await this.addLinks(childLinks); // Add Child Links For Next Crawl

					await childLinks.forEach(async childLink => {
						await link.addChild(childLink); // Create Child Link Association
					});

					const title = $('title').text().trim(); // Get Page Title
					let text = $('body').text(); // Get Page Text
					text = this.shortenText(text);
					await this.createPageAndIndex(link, title, text);
				} else {
					await link.destroy(); // Delete Invalid Link
				}
			} catch (e) {
				console.log(e);
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

	static shortenText(text) {
		text = text.replace(/(<([^>]+)>)/gi, ''); // Remove All HTML Tags From Text
		text = text.replace(/([^A-Z])([A-Z])/g, '$1 $2'); // Add Space Before Every Capital Letter Not Followed By A Capital Letter
		text = text.replace(/([^0-9\,\.])([0-9])/g, '$1 $2'); // Add Space Before Every Number Not Followed By A Number, Comma Or Period
		text = text.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2'); // Add Space Before Group Of Capital Letter & Small Letter Followed By A Capital Letter
		text = text.replace(/\s\s+/g, ' '); // Replace Multiple Spaces With Single Space
		text = text.trim(); // Trim Whitespace

		return text;
	}

	static async createPageAndIndex(link, title, text) {
		await link.createPage({
			title,
			text,
		});

		text = text.toLowerCase();
		const regex = /([a-z]+)/g; // Match English Words
		const words = text.match(regex); // Extract English Words
		let keywords = this.getUniqueKeywords(words);
		keywords = this.transformKeywordsForDatabaseInsertion(keywords);

		keywords = await Keyword.bulkCreate(keywords, {
			updateOnDuplicate: ['word'], // Don't Update Any Field If Keyword Already Exists
		});

		await keywords.forEach(async keyword => {
			await link.addKeyword(keyword);
		});
	}

	static transformKeywordsForDatabaseInsertion(keywords) {
		// Transform Simple Array Into Array Of Objects For Bulk Create
		keywords = keywords.map(word => {
			return {
				word,
			};
		});

		return keywords;
	}

	static getUniqueKeywords(keywords) {
		const uniqueKeywords = {};

		keywords.forEach(keyword => {
			uniqueKeywords[keyword] = '';
		});

		keywords = Object.keys(uniqueKeywords);

		return keywords;
	}
}

// Export Service
module.exports = Crawl;

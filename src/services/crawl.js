// Load Modules
const validator = require('validator');

// Create Service
class Crawl {
	static async addLinks(links) {
		return true;
	}

	static getValidLinks(links) {
		return links
			.map(link => link.toLowerCase().trim()) // Transform Links
			.filter(link => validator.isURL(link)); // Filter Valid Links
	}
}

// Export Service
module.exports = Crawl;

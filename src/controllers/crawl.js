// Load Services
const { Crawl: CrawlService } = require('../services');

// Create Controller
class Crawl {
	static async crawlLinks({ query }, res) {
		const limit = +query.limit || 10; // Default Limit Is 10
		const links = await CrawlService.getLinksForCrawling(limit); // Get Links To Crawl (Upto Limit)
		CrawlService.crawlLinks(links); // Crawl Links In Background (Don't Use 'await' Here)
		res.send({ limit });
	}

	static async addLinks({ body }, res) {
		let { links } = body;

		if (Array.isArray(links)) {
			links = await CrawlService.addLinks(links);
			const count = links.length;
			res.send({ count, links });
		} else {
			res.status(400).send();
		}
	}
}

// Export Controller
module.exports = Crawl;

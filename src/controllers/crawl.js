// Load Services
const { Crawl: CrawlService } = require('../services');

// Create Controller
class Crawl {
	static async crawlLinks({ query }, res) {
		const limit = +query.limit || 10; // Default Limit Is 10
		let links = await CrawlService.getLinksForCrawling(limit); // Get Links To Crawl (Upto Limit)
		let count = links.length;

		if (count) {
			[count, links] = await CrawlService.setStatusToCrawling(links); // To Prevent Crawling The Same Links Again

			if (count) {
				CrawlService.crawlLinks(links); // Crawl Links In Background (Don't Use 'await' Here)
			}
		}

		res.send({ limit, count, links });
	}

	static async addLinks({ body }, res) {
		let { links } = body;

		if (Array.isArray(links)) {
			links = CrawlService.getValidLinks(links);

			if (links.length > 0) {
				links = await CrawlService.addLinks(links);
				const count = links.length;

				if (count) {
					res.send({ count, links });
				} else {
					res.status(500).send();
				}
			} else {
				res.status(400).send();
			}
		} else {
			res.status(400).send();
		}
	}
}

// Export Controller
module.exports = Crawl;

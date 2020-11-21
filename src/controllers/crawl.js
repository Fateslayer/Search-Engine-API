// Load Services
const { Crawl: CrawlService } = require('../services');

// Create Controller
class Crawl {
	static async crawlLinks({ query }, res) {
		const limit = +query.limit || 10;
		const links = await CrawlService.crawlLinks(limit);
		res.send({ limit, links });
	}

	static async addLinks({ body }, res) {
		let { links } = body;

		if (Array.isArray(links)) {
			links = CrawlService.getValidLinks(links);

			if (links.length > 0) {
				const result = await CrawlService.addLinks(links);

				if (result) {
					res.send();
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

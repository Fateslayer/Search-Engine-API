// Load Services
const { Rank: RankService } = require('../services');

// Create Controller
class Rank {
	static async rankLinks(req, res) {
		const count = await RankService.rankLinks();

		res.send({ count });
	}
}

// Export Controller
module.exports = Rank;

// Load Services
const { Rank: RankService } = require('../services');

// Create Controller
class Rank {
	static async rankLinks(req, res) {
		const graph = await RankService.getGraph();
		const ranks = await RankService.getRanks(graph);
		res.send(ranks);
	}
}

// Export Controller
module.exports = Rank;

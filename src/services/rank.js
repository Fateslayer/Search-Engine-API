// Load Models
const { Link } = require('../models');

// Create Service
class Rank {
	static async getGraph() {
		const graph = {};

		const links = await Link.findAll({
			attributes: ['id'],
			include: {
				model: Link,
				as: 'child',
				attributes: ['id'],
			},
		});

		links.forEach(link => {
			graph[link.id] = link.child.map(c => c.id);
		});

		return graph;
	}

	static async getRanks(graph, iterations = 5) {
		let ranks = {};
		const dF = 0.8;
		const ids = Object.keys(graph);
		const nLinks = ids.length;

		ids.forEach(id => {
			ranks[id] = 1 / nLinks;
		});

		for (let i = 0; i < iterations; ++i) {
			const newRanks = {};

			ids.forEach(id => {
				let newRank = (1 - dF) / nLinks;

				ids.forEach(node => {
					if (graph[node].indexOf(+id) !== -1) {
						newRank += dF * (ranks[node] / graph[node].length);
					}
				});

				newRanks[id] = newRank;
			});

			ranks = newRanks;
		}

		return ranks;
	}

	static async applyRanks(ranks) {
		const ids = Object.keys(ranks);

		await ids.forEach(async id => {
			const rank = ranks[id];

			await Link.update(
				{
					rank,
				},
				{
					where: {
						id,
					},
				}
			);
		});
	}
}

// Export Service
module.exports = Rank;

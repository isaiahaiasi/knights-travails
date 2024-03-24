/*
To find the shortest path a Knight can take between two points on a chess board,
we can use Breadth-First Search and traverse the matrix of the board.
From any given point, there are up to 8 positions the Knight can move to.
If we are traversing breadth-first, we know that the first time we see a position
will be the shortest path to that position.

This isn't going to be the fastest algorithm, because there are heuristics
we could use to ignore certain decision branches. For example, if the position
we want is 4 squares above us, there's no reason to "expand" our search below us.

In order to implement our search algo, we will need a Queue. Since JavaScript
doesn't provide a built-in utility for this, and as mentioned above we aren't
really optimizing for speed, we will simply use an array.

We have two other requirements: we need to preserve the ideal path, and we need
to avoid repeating positions we've already tested.
We can address both of these by having a "visited" object where each key is a
position and each value is the position that proceeded it.
*/

const BOARD_SIZE = [8, 8]

const STEPS = [
	[-2, -1],
	[-2, 1],
	[2, -1],
	[2, 1],
	[-1, -2],
	[-1, 2],
	[1, -2],
	[1, 2],
];

/**
 * Whether a given position fits on the given chess board
 * @param {[number, number]} position The [x, y] position to test
 * @returns {boolean}
 */
function inRange([x, y]) {
	return (x >= 0 && x < BOARD_SIZE[0] && y >= 0 && y < BOARD_SIZE[1]);
}

function getAdjacent([x, y]) {
	const adj =  STEPS.map(([rx, ry]) => ([x + rx, y + ry]))
	return adj.filter(inRange);
}

function getPath(end, visited) {
	let cur = end;
	const path = [];
	while (cur) {
		path.unshift(cur);
		cur = visited[cur[1]][cur[0]];
	}

	return path;
}

/**
 * @param {[number, number]} start The knight's starting [x, y] position
 * @param {[number, number]} end The target [x, y] position for the knight
 * @returns {Array<[number,number]>} The shortest path from start to end
 */
function knightMoves(start, end) {
	// Initialize the visited matrix
	const visited = new Array(8).fill(null).map(() => new Array(8).fill(undefined));
	visited[start[1]][start[0]] = false;

	queue = [start];

	while (queue.length > 0) {
		const pos = queue.shift();

		if (pos[0] == end[0] && pos[1] == end[1]) {
			return getPath(pos, visited);
		}

		getAdjacent(pos).forEach(adj => {
			const [x, y] = adj;
			if (visited[y][x] == undefined) {
				visited[y][x] = pos;
				queue.push(adj);
			}
		});
	}

	return [];
}

const tests = [
	{
		start: [0, 0],
		end: [3, 3],
		ans: [[0, 0], [2, 1], [3, 3]],
	},
	{
		start: [3, 3],
		end: [0, 0],
		ans: [[3, 3], [1, 2], [0, 0]],
	},
	{
		start: [0, 0],
		end: [7, 7],
		ans: [[0, 0], [2, 1], [0, 2], [2, 3], [4, 4], [6, 5], [7, 7]],
	},
];

tests.forEach(({start, end, ans}) => {
	result = knightMoves(start, end);
	if (JSON.stringify(result) == JSON.stringify(ans)) {
		console.log(`${start},${end} -> GOOD`);
	} else {
		console.log(`(${start}),(${end}) MISMATCH\nExpected ${ans}\nReceived ${result}`);
	}
});

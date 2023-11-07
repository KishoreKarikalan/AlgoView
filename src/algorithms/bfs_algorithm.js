function bfs(grid, startNode, endNode) {
  if (!grid || !startNode || !endNode || !grid.length || !grid[0].length) {
    console.error("Invalid input data.");
    return null;
  }

  const visitedNodesInOrder = [];
  const queue = [startNode];

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === endNode) {
      return visitedNodesInOrder;
    }

    if (current.isWall || current.isVisited) {
      continue;
    }

    visitedNodesInOrder.push(current);
    current.isVisited = true;

    const neighbors = getNeighbors(current, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited) {
        neighbor.previousNode = current;
        queue.push(neighbor);
      }
    }
  }

  console.error("No path found.");
  return null;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}

export default bfs;

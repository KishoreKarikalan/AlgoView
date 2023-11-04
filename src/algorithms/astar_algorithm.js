function astar(grid, startNode, endNode) {
  if (!grid || !startNode || !endNode || !grid.length || !grid[0].length) {
    console.error("Invalid input data.");
    return null;
  }

  const visitedNodesInOrder = [];
  const openSet = [startNode];

  startNode.gScore = 0;
  startNode.fScore = heuristic(startNode, endNode);
  while (openSet.length > 0) {
    const current = getLowestFScoreNode(openSet);

    if (current === endNode) {
      return visitedNodesInOrder;
    }

    openSet.splice(openSet.indexOf(current), 1);
    visitedNodesInOrder.push(current);

    const neighbors = getNeighbors(current, grid);
    for (const neighbor of neighbors) {
      if (visitedNodesInOrder.includes(neighbor) || neighbor.isWall) {
        continue;
      }

      const weight = neighbor.weightValue + 1; // Get the weightValue from the node
      const tentativeGScore = current.gScore + weight;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= neighbor.gScore) {
        continue;
      }
      neighbor.previousNode = current;

      neighbor.gScore = tentativeGScore;
      neighbor.fScore = neighbor.gScore + heuristic(neighbor, endNode);
    }
  }

  console.error("No path found.");
  return null;
}

function heuristic(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function getLowestFScoreNode(nodes) {
  return nodes.reduce(
    (current, node) => (node.fScore < current.fScore ? node : current),
    nodes[0]
  );
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

export default astar;

function greedyBestFirst(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const openSet = [startNode];

  while (openSet.length > 0) {
    const current = getClosestNodeToGoal(openSet, endNode);

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

      openSet.push(neighbor);
      neighbor.previousNode = current; // Set the previousNode property.
    }
  }

  console.error("No path found.");
  return null;
}

function getClosestNodeToGoal(nodes, endNode) {
  return nodes.reduce(
    (closest, node) =>
      heuristic(node, endNode) / (1 + node.weightValue) <
      heuristic(closest, endNode) / (1 + closest.weightValue)
        ? node
        : closest,
    nodes[0]
  );
}

function heuristic(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
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

export default greedyBestFirst;

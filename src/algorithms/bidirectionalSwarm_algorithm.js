function bidirectionalSwarm(grid, startNode, endNode) {
  if (!grid || !startNode || !endNode || !grid.length || !grid[0].length) {
    console.error("Invalid input data.");
    return null;
  }

  // Initialize forwardGScore and backwardGScore properties for each node
  grid.forEach((row) => {
    row.forEach((node) => {
      node.forwardGScore = Infinity;
      node.backwardGScore = Infinity;
    });
  });

  // Initialize sets to track visited nodes
  let forwardVisitedSet = new Set();
  let backwardVisitedSet = new Set();

  let visitedNodesInOrder = [];
  let forwardOpenSet = [startNode];
  let backwardOpenSet = [endNode];
  let forwardCameFrom = {};
  let backwardCameFrom = {};
  startNode.forwardGScore = 0;
  endNode.backwardGScore = 0;

  while (forwardOpenSet.length > 0 && backwardOpenSet.length > 0) {
    const forwardCurrent = getLowestForwardFScoreNode(forwardOpenSet);
    const backwardCurrent = getLowestBackwardFScoreNode(backwardOpenSet);

    visitedNodesInOrder.push(forwardCurrent);
    visitedNodesInOrder.push(backwardCurrent);

    // Check if forward meets backward
    if (forwardVisitedSet.has(backwardCurrent)) {
      // The meeting condition is satisfied
      return visitedNodesInOrder;
    }

    // Mark the nodes as visited
    forwardVisitedSet.add(forwardCurrent);
    backwardVisitedSet.add(backwardCurrent);

    const forwardNeighbors = getNeighbors(
      forwardCurrent,
      grid,
      forwardVisitedSet,
      backwardVisitedSet
    );
    const backwardNeighbors = getNeighbors(
      backwardCurrent,
      grid,
      forwardVisitedSet,
      backwardVisitedSet
    );

    for (const forwardNeighbor of forwardNeighbors) {
      if (forwardNeighbor.isWall) continue;

      const tentativeForwardGScore = forwardCurrent.forwardGScore + 1;
      if (
        tentativeForwardGScore < (forwardNeighbor.forwardGScore || Infinity)
      ) {
        forwardCameFrom[forwardNeighbor] = forwardCurrent;
        forwardNeighbor.forwardGScore = tentativeForwardGScore;

        if (!forwardOpenSet.includes(forwardNeighbor)) {
          forwardOpenSet.push(forwardNeighbor);
        }
      }
    }

    for (const backwardNeighbor of backwardNeighbors) {
      if (backwardNeighbor.isWall) continue;

      const tentativeBackwardGScore = backwardCurrent.backwardGScore + 1;

      if (
        tentativeBackwardGScore < (backwardNeighbor.backwardGScore || Infinity)
      ) {
        backwardCameFrom[backwardNeighbor] = backwardCurrent;
        backwardNeighbor.backwardGScore = tentativeBackwardGScore;
        backwardNeighbor.previousNode = backwardCurrent;
        if (!backwardOpenSet.includes(backwardNeighbor)) {
          backwardOpenSet.push(backwardNeighbor);
        }
      }
    }

    // After visiting a node in forward search:
    forwardOpenSet = forwardOpenSet.filter((node) => node !== forwardCurrent);

    // After visiting a node in backward search:
    backwardOpenSet = backwardOpenSet.filter(
      (node) => node !== backwardCurrent
    );
  }

  console.error("No path found.");
  return null;
}

// Define a function to get the node with the lowest forward G score.
function getLowestForwardFScoreNode(nodes) {
  let lowestNode = nodes[0];
  for (const node of nodes) {
    if (node.forwardGScore < lowestNode.forwardGScore) {
      lowestNode = node;
    }
  }
  return lowestNode;
}

// Define a function to get the node with the lowest backward G score.
function getLowestBackwardFScoreNode(nodes) {
  let lowestNode = nodes[0];
  for (const node of nodes) {
    if (node.backwardGScore < lowestNode.backwardGScore) {
      lowestNode = node;
    }
  }
  return lowestNode;
}

// Define a function to get neighboring nodes.
function getNeighbors(node, grid, forwardVisitedSet, backwardVisitedSet) {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) {
    const topNeighbor = grid[row - 1][col];
    if (
      !forwardVisitedSet.has(topNeighbor) &&
      !backwardVisitedSet.has(topNeighbor)
    ) {
      neighbors.push(topNeighbor);
    }
  }

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}

export default bidirectionalSwarm;

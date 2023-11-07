import React, { useState } from "react";
import Node from "./node";
import SpeedSlider from "./SpeedSlider";
import dijkstra from "../algorithms/dijkstras_algorithm";
import astar from "../algorithms/astar_algorithm";
import bidirectionalSwarm from "../algorithms/bidirectionalSwarm_algorithm";
import bfs from "../algorithms/bfs_algorithm";
import greedyBestFirst from "../algorithms/greedyBestFirst_algorithm";
import dfs from "../algorithms/dfs_algorithm";

function createBoard() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const cellSize = 25;
  const rows = Math.floor(screenHeight / (cellSize*1.5));
  const cols = Math.floor(screenWidth / cellSize);

  const board = [];

  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row: row,
        col: col,
        isStart: false,
        isEnd: false,
        isWall: false,
        weightValue: 0,
        previousNode: null,
        distance: Infinity,
      });
    }
    board.push(currentRow);
  }

  return board;
}

function boardHasWeights(board) {
  for (const row of board) {
    for (const node of row) {
      if (node.weightValue > 0) {
        return true;
      }
    }
  }
  return false;
}

function Board({ onNodeClick, selectedOption }) {
  const [board, setBoard] = useState(createBoard());
  const [mouseDown, setMouseDown] = useState(false);
  const [startNodePosition, setStartNodePosition] = useState(null);
  const [endNodePosition, setEndNodePosition] = useState(null);
  const [algorithmSpeed, setAlgorithmSpeed] = useState(5);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("dijkstra"); // Default to Dijkstra's algorithm

  const clearAnimatedNodes = () => {
    const visitedNodes = document.querySelectorAll(".visited");
    const shortestPathNodes = document.querySelectorAll(".shortest-path");

    visitedNodes.forEach((node) => {
      node.classList.remove("visited");
    });

    shortestPathNodes.forEach((node) => {
      node.classList.remove("shortest-path");
    });
  };

  const clearBoard = () => {
    const clearedBoard = createBoard();
    setBoard(clearedBoard);

    setStartNodePosition(null);
    setEndNodePosition(null);
    clearAnimatedNodes();
  };

  const handleNodeClick = (row, col) => {
    const updatedBoard = board.map((currentRow, rowIndex) =>
      currentRow.map((node, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          if (selectedOption === "start") {
            setStartNodePosition({ row: row, col: col });
            return {
              ...node,
              isStart: true,
            };
          } else if (selectedOption === "end") {
            setEndNodePosition({ row: row, col: col });
            return {
              ...node,
              isEnd: true,
            };
          } else if (selectedOption === "walls") {
            return {
              ...node,
              isWall: !node.isWall,
            };
          } else if (selectedOption === "weights") {
            const newWeightValue = (node.weightValue + 5) % 20; 
            return {
              ...node,
              weightValue: newWeightValue,
            };
          }
        } else if (selectedOption === "start" && node.isStart) {
          
          return {
            ...node,
            isStart: false,
          };
        } else if (selectedOption === "end" && node.isEnd) {
          return {
            ...node,
            isEnd: false,
          };
        }
        return node;
      })
    );
    setBoard(updatedBoard);
  };

  const handleNodeEnter = (row, col) => {
    const updatedBoard = board.map((currentRow, rowIndex) => {
      return currentRow.map((node, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          if (mouseDown) {
            if (selectedOption === "walls") {
              return {
                ...node,
                isWall: !node.isWall,
              };
            }
          }
        }
        return node;
      });
    });
    setBoard(updatedBoard);
  };

  const findShortestPath = () => {
    if (!startNodePosition || !endNodePosition) {
      alert("Please select both a starting and ending point");
      return;
    }

    clearAnimatedNodes();

    if (selectedAlgorithm === "dijkstra") {
      const visitedNodesInOrder = dijkstra(
        board,
        board[startNodePosition.row][startNodePosition.col],
        board[endNodePosition.row][endNodePosition.col]
      );
      const shortestPath = getShortestPath(
        board[endNodePosition.row][endNodePosition.col]
      );
      animatePath(visitedNodesInOrder, shortestPath);
    } else if (selectedAlgorithm === "astar") {
      const visitedNodesInOrder = astar(
        board,
        board[startNodePosition.row][startNodePosition.col],
        board[endNodePosition.row][endNodePosition.col]
      );
      const shortestPath = getShortestPath(
        board[endNodePosition.row][endNodePosition.col]
      );
      animatePath(visitedNodesInOrder, shortestPath);
    } else if (selectedAlgorithm === "bidirectionalSwarm") {
      const visitedNodesInOrder = bidirectionalSwarm(
        board,
        board[startNodePosition.row][startNodePosition.col],
        board[endNodePosition.row][endNodePosition.col]
      );
      dijkstra(
        board,
        board[startNodePosition.row][startNodePosition.col],
        board[endNodePosition.row][endNodePosition.col]
      );
      const shortestPath = getShortestPath(
        board[endNodePosition.row][endNodePosition.col]
      );

      animatePath(visitedNodesInOrder, shortestPath);
    } else if (selectedAlgorithm === "bfs") {
      if (boardHasWeights(board))
        alert("The graph is weighted. Please select a different algorithm.");
      else {
        const visitedNodesInOrder = bfs(
          board,
          board[startNodePosition.row][startNodePosition.col],
          board[endNodePosition.row][endNodePosition.col]
        );
        const shortestPath = getShortestPath(
          board[endNodePosition.row][endNodePosition.col]
        );
        animatePath(visitedNodesInOrder, shortestPath);
      }
    } else if (selectedAlgorithm === "greedyBestFirst") {
      const visitedNodesInOrder = greedyBestFirst(
        board,
        board[startNodePosition.row][startNodePosition.col],
        board[endNodePosition.row][endNodePosition.col]
      );
      const shortestPath = getShortestPath(
        board[endNodePosition.row][endNodePosition.col]
      );
      animatePath(visitedNodesInOrder, shortestPath);
    } else if (selectedAlgorithm === "dfs") {
      if (boardHasWeights(board))
        alert("The graph is weighted. Please select a different algorithm.");
      else {
        const visitedNodesInOrder = dfs(
          board,
          board[startNodePosition.row][startNodePosition.col],
          board[endNodePosition.row][endNodePosition.col]
        );
        const shortestPath = getShortestPath(
          board[endNodePosition.row][endNodePosition.col]
        );
        animatePath(visitedNodesInOrder, shortestPath);
      }
    }
  };

  const getShortestPath = (endNode) => {
    const shortestPath = [];

    let currentNode = endNode;
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    return shortestPath;
  };

  const animatePath = (visitedNodesInOrder, shortestPath) => {
    if (visitedNodesInOrder && visitedNodesInOrder.length) {
      for (let i = 0; i < visitedNodesInOrder.length; i++) {
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          if (node) {
            const animatedNode = document.getElementById(
              `node-${node.row}-${node.col}`
            );
            if (animatedNode) {
              animatedNode.classList.add("visited");
            }

            if (i === visitedNodesInOrder.length - 1) {
              animateShortestPath();
            }
          }
        }, (i * 50) / algorithmSpeed);
      }
    }

    function animateShortestPath() {
      if (shortestPath && shortestPath.length) {
        for (let i = 0; i < shortestPath.length; i++) {
          setTimeout(() => {
            const node = shortestPath[i];
            if (node) {
              const animatedNode = document.getElementById(
                `node-${node.row}-${node.col}`
              );
              if (animatedNode) {
                animatedNode.classList.add("shortest-path");
              }
            }
          }, (i * 50) / algorithmSpeed);
        }
      }
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setAlgorithmSpeed(newSpeed);
  };

  const handleAlgorithmChange = (selectedAlgorithm) => {
    setSelectedAlgorithm(selectedAlgorithm);
    clearAnimatedNodes();
  };

  return (
    <div>
      <div className="d-flex justify-content-around my-3">
      <button class="btn btn-outline-secondary" onClick={clearBoard}>Clear Board</button>
      <button class="btn btn-outline-secondary mx-3" onClick={findShortestPath}>Visulaize Algorithm</button>
      <SpeedSlider speed={algorithmSpeed} onSpeedChange={handleSpeedChange} />
      <select
        value={selectedAlgorithm}
        onChange={(e) => handleAlgorithmChange(e.target.value)}
      >
        <option value="dijkstra">Dijkstra's Algorithm</option>
        <option value="astar">A* Algorithm</option>
        <option value="bidirectionalSwarm">
          Bidirectional Swarm Algorithm
        </option>
        <option value="bfs">Breadth-First Search (BFS)</option>
        <option value="dfs">Depth-First Search (DFS)</option>
        <option value="greedyBestFirst">Greedy-BestFirst Algorithm</option>
      </select>
      </div>

      <table className="board">
        <tbody onMouseUp={() => setMouseDown(false)}>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((node, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => handleNodeClick(rowIndex, colIndex)}
                  onMouseDown={() => {
                    setMouseDown(true);
                    handleNodeEnter(rowIndex, colIndex);
                  }}
                  onMouseEnter={() => handleNodeEnter(rowIndex, colIndex)}
                  onMouseUp={() => setMouseDown(false)}
                >
                  <Node
                    nodeId={`node-${node.row}-${node.col}`}
                    isStart={node.isStart}
                    isEnd={node.isEnd}
                    isWall={node.isWall}
                    weightValue={node.weightValue}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;

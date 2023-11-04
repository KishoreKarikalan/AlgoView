import React from "react";
import "../styles/homeStyle.css";

function Home() {
  const graphAlgorithms = [
    {
      name: "Dijkstra's Algorithm",
      timeComplexity:
        "O(V^2) using an adjacency matrix, O((V + E) * log(V)) using a min-priority queue",
      spaceComplexity: "O(V)",
      description: "Used to find the shortest path in a weighted graph.",
      canFindShortestPath: "Yes",
    },
    {
      name: "A* Algorithm",
      timeComplexity: "Depends on the heuristic function used",
      spaceComplexity: "Depends on the heuristic function used",
      description:
        "Used to find the shortest path in a weighted graph using a heuristic function.",
      canFindShortestPath: "Yes",
    },
    {
      name: "Bidirectional Swarm",
      timeComplexity: "Depends on the specific implementation",
      spaceComplexity: "Depends on the specific implementation",
      description:
        "Experimental algorithm for finding the shortest path in certain cases.",
      canFindShortestPath: "Yes (experimental)",
    },
    {
      name: "Breadth-First Search (BFS)",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      description: "Used to find the shortest path in an unweighted graph.",
      canFindShortestPath: "Yes",
    },
    {
      name: "Depth-First Search (DFS)",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      description: "Not typically used to find the shortest path.",
      canFindShortestPath: "No",
    },
    {
      name: "Greedy Best-First Algorithm",
      timeComplexity: "Depends on the specific heuristic used",
      spaceComplexity: "Depends on the specific heuristic used",
      description:
        "Used to find the shortest path using a heuristic function, but it may not guarantee the shortest path.",
      canFindShortestPath: "No (in general)",
    },
  ];

  const sortingAlgorithms = [
    {
      name: "Bubble Sort",
      timeComplexity: "O(n), O(n^2), O(n^2)",
      spaceComplexity: "O(1)",
      description:
        "Simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    },
    {
      name: "Insertion Sort",
      timeComplexity: "O(n), O(n^2), O(n^2)",
      spaceComplexity: "O(1)",
      description:
        "Simple sorting algorithm that builds the final sorted array one item at a time.",
    },
    {
      name: "Selection Sort",
      timeComplexity: "O(n^2), O(n^2), O(n^2)",
      spaceComplexity: "O(1)",
      description:
        "Simple sorting algorithm that divides the list into a sorted and an unsorted region.",
    },
    {
      name: "Quick Sort",
      timeComplexity: "O(n log n), O(n log n), O(n^2)",
      spaceComplexity: " O(log n)",
      description:
        "Efficient, widely used sorting algorithm that employs a divide-and-conquer strategy to sort elements. It has better average and best-case time complexity compared to other quadratic sorting algorithms.",
    },
  ];

  return (
    <div className="container mt-4">
      <h1 className="display-4">Algorithm Visualizer</h1>
      <p className="lead">Explore and understand various algorithms</p>

      <h2 className="mt-4 animate-fadeIn">Why Visualize Algorithms?</h2>
      <p className="animate-fadeIn">
        Algorithm visualization is a powerful tool for understanding and
        learning complex algorithms. It provides a visual representation of
        algorithmic processes, making it easier to grasp their inner workings.
        Visualizing algorithms offers several benefits:
      </p>
      <ul className="animate-fadeIn">
        <li>
          <strong>Enhanced Learning:</strong> Visualizations help learners
          understand algorithms intuitively, even if they have no prior
          experience.
        </li>
        <li>
          <strong>Debugging:</strong> Visualizations make it easier to detect
          and correct errors in the implementation of algorithms.
        </li>
        <li>
          <strong>Optimization:</strong> Analyzing visual representations of
          algorithms can lead to insights on optimization and performance
          improvements.
        </li>
        <li>
          <strong>Problem Solving:</strong> Algorithm visualization allows users
          to explore different scenarios and problem-solving strategies.
        </li>
      </ul>

      <h2>Graph Algorithms</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Time Complexity</th>
            <th>Space Complexity</th>
            <th>Description</th>
            <th>Can Find Shortest Path</th>
          </tr>
        </thead>
        <tbody>
          {graphAlgorithms.map((algorithm, index) => (
            <tr key={index}>
              <td>{algorithm.name}</td>
              <td>{algorithm.timeComplexity}</td>
              <td>{algorithm.spaceComplexity}</td>
              <td>{algorithm.description}</td>
              <td>{algorithm.canFindShortestPath}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Sorting Algorithms</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Best Time Complexity</th>
            <th>Average Time Complexity</th>
            <th>Worst Time Complexity</th>
            <th>Space Complexity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {sortingAlgorithms.map((algorithm, index) => (
            <tr key={index}>
              <td>{algorithm.name}</td>
              <td>{algorithm.timeComplexity.split(", ")[0]}</td>
              <td>{algorithm.timeComplexity.split(", ")[1]}</td>
              <td>{algorithm.timeComplexity.split(", ")[2]}</td>
              <td>{algorithm.spaceComplexity}</td>
              <td>{algorithm.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p>Connect with me on LinkedIn:</p>
              <a
                href="YOUR_LINKEDIN_PROFILE_URL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

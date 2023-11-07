import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import GraphAlgorithms from "./components/GraphAlgorithms";
import SortingAlgorithms from "./components/SortingAlgorithms";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Algo-View
            </Link>
            <div className="navbar-nav ml-auto">
              <Link className="nav-link" to="/graph-algorithms">
                Graph Algorithms
              </Link>
              <Link className="nav-link" to="/sorting-algorithms">
                Sorting Algorithms
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/graph-algorithms" element={<GraphAlgorithms />} />
          <Route path="/sorting-algorithms" element={<SortingAlgorithms />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

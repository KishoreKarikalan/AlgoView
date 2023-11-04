import React, { useState } from "react";
import Board from "./board"; // Import your Board component here
import GraphToolBar from "./GraphToolBar"; // Import your GraphToolBar component here

function GraphAlgorithms() {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div>
      <GraphToolBar setSelectedOption={setSelectedOption} />
      <Board selectedOption={selectedOption} />
    </div>
  );
}

export default GraphAlgorithms;

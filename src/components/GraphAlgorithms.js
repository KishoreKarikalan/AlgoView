import React, { useState } from "react";
import Board from "./board";
import GraphToolBar from "./GraphToolBar";

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

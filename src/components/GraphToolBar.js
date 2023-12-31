import React from "react";

function GraphToolBar(props) {
  const handleOptionClick = (option) => {
    props.setSelectedOption(option);
  };

  return (
    <div className="d-flex justify-content-around my-3">
      <button
        className="btn btn-outline-secondary"
        onClick={() => handleOptionClick("start")}
      >
        Set Start Node
      </button>
      <button
        className="btn btn-outline-secondary"
        onClick={() => handleOptionClick("end")}
      >
        Set End Node
      </button>
      <button
        className="btn btn-outline-secondary"
        onClick={() => handleOptionClick("weights")}
      >
        Set Weights
      </button>
      <button
        className="btn btn-outline-secondary"
        onClick={() => handleOptionClick("walls")}
      >
        Set Walls
      </button>
    </div>
  );
}

export default GraphToolBar;

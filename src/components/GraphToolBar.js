import React from "react";

function GraphToolBar(props) {
  const handleOptionClick = (option) => {
    props.setSelectedOption(option);
  };

  return (
    <div className="navbar">
      <button onClick={() => handleOptionClick("start")}>Set Start Node</button>
      <button onClick={() => handleOptionClick("end")}>Set End Node</button>
      <button onClick={() => handleOptionClick("weights")}>Set Weights</button>
      <button onClick={() => handleOptionClick("walls")}>Set Walls</button>
    </div>
  );
}

export default GraphToolBar;

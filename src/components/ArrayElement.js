import React from "react";
import "../styles/arrayELementStyle.css"; 

const ArrayElement = ({ value }) => {
  const elementStyle = {
    height: `${value}px`,
  };

  return <div className="array-element" style={elementStyle}></div>;
};

export default ArrayElement;

import React from "react";
import "../styles/arrayELementStyle.css"; // Import your CSS file

const ArrayElement = ({ value }) => {
  // You can style the ArrayElement here, for example:
  const elementStyle = {
    height: `${value}px`,
  };

  return <div className="array-element" style={elementStyle}></div>;
};

export default ArrayElement;

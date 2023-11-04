import React from "react";

function SpeedSlider({ speed, onSpeedChange }) {
  const handleSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value, 10);
    onSpeedChange(newSpeed);
  };

  return (
    <div className="speed-slider">
      <label htmlFor="algorithmSpeed">Algorithm Speed:</label>
      <input
        type="range"
        id="algorithmSpeed"
        min="1"
        max="3"
        value={speed}
        onChange={handleSpeedChange}
      />
      <span>{speed === 1 ? "Slow" : speed === 2 ? "Medium" : "Fast"}</span>
    </div>
  );
}

export default SpeedSlider;

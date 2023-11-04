import "../styles/nodeStyle.css"; // Import your CSS file

function Node({
  nodeId,
  isStart,
  isEnd,
  isMarked,
  isPath,
  isWall,
  weightValue,
}) {
  let classNames = "node"; // Default class
  if (isStart) classNames += " start"; // Add start class if needed
  if (isEnd) classNames += " end"; // Add end class if needed
  if (isMarked) classNames += " marked"; // Add marked class if needed
  if (isPath) classNames += " path"; // Add path class if needed
  if (isWall) classNames += " wall"; // Add wall class if needed
  if (weightValue !== 0) classNames += " weighted"; // Add weighted class if needed

  return (
    <div className={classNames} id={nodeId}>
      {weightValue !== 0 && <div className="weight-value">{weightValue}</div>}
    </div>
  );
}

export default Node;

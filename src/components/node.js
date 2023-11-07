import "../styles/nodeStyle.css";

function Node({
  nodeId,
  isStart,
  isEnd,
  isMarked,
  isPath,
  isWall,
  weightValue,
}) {
  let classNames = "node";
  if (isStart) classNames += " start"; 
  if (isEnd) classNames += " end";
  if (isMarked) classNames += " marked"; 
  if (isPath) classNames += " path"; 
  if (isWall) classNames += " wall"; 
  if (weightValue !== 0) classNames += " weighted"; 

  return (
    <div className={classNames} id={nodeId}>
      {weightValue !== 0 && <div className="weight-value">{weightValue}</div>}
    </div>
  );
}

export default Node;

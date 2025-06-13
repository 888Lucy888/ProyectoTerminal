import React from "react";
import StateTimeline from "../App"; // Import StateTimeline if it's in the same file or adjust the path accordingly

// Component to display OEE metrics and timeline
const OEEVisualization = ({ oeeData, availabilityReal, performanceReal, qualityReal, oeeRatio }) => {
  return (
    <div>
      <h1>OEE Dashboard</h1>
      {oeeData && (
        <>
          <StateTimeline data={oeeData.stateTimeline} />
          <div>
            <h2>Metrics</h2>
            <p>Availability: {availabilityReal}</p>
            <p>Performance: {performanceReal}</p>
            <p>Quality: {qualityReal}</p>
            <p>OEE Ratio: {(oeeRatio * 100).toFixed(2)}%</p>
          </div>
        </>
      )}
    </div>
  );
};

export default OEEVisualization;
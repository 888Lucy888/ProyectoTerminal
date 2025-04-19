export const fetchOEEData = async (shiftId, assetId, startTime, endTime) => {
  const url = `https://zi7afigz5e.execute-api.us-east-1.amazonaws.com/dev/get_oee?shift_id=${shiftId}&asset_id=${assetId}&start_time=${startTime}&end_time=${endTime}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("OEE Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching OEE data:", error);
  }
};

export const processOEEData = (data) => {
  // Extract availability metrics
  const minutesOperated = data.availability.minutes_goal || 0; // Total minutes available
  const availabilityGoal = data.availability.minutes_goal || 1; // Avoid division by zero
  const availabilityReal = (minutesOperated / availabilityGoal) * 100;

  // Extract performance metrics
  const piecesProduced = data.performance.production_measures.reduce((sum, p) => sum + p, 0); // Sum of all production measures
  const productionGoal = data.performance.production_goal || 1; // Avoid division by zero
  const performanceReal = (piecesProduced / productionGoal) * 100;

  // Extract quality metrics
  const piecesApproved = data.quality.quality_measures.reduce((sum, q) => sum + q, 0); // Sum of all quality measures
  const qualityReal = (piecesApproved / piecesProduced) * 100; // Avoid division by zero

  // Calculate OEE
  const oeeRatio = (availabilityReal / 100) * (performanceReal / 100) * (qualityReal / 100);

  return {
    availabilityReal,
    performanceReal,
    qualityReal,
    oeeRatio: oeeRatio * 100, // Convert to percentage
  };
};
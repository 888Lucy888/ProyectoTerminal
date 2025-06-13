export const fetchOEEData = async (shiftId, assetId, startTime, endTime) => {
  const url = `https://zi7afigz5e.execute-api.us-east-1.amazonaws.com/dev/get_oee?shift_id=${shiftId}&asset_id=${assetId}&start_time=${startTime}&end_time=${endTime}`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching OEE data:", error);
  }
};

export const processOEEData = (data) => {
  const availabilityReal = (data.availability.minutes_operated / data.availability.minutes_goal) * 100;
  const performanceReal = (data.performance.pieces_produced / data.performance.production_goal) * 100;
  const qualityReal = (data.quality.pieces_approved / data.performance.pieces_produced) * 100;
  const oeeRatio = (availabilityReal * performanceReal * qualityReal) / 10000;

  return { availabilityReal, performanceReal, qualityReal, oeeRatio };
};
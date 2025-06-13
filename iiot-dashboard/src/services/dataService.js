import { API } from '@aws-amplify/api';

// Fetch historical sensor data
export const fetchSensorData = async (timeRange = '1h') => {
  try {
    const response = await API.post('queryApi', '/query', {
      body: {
        timeRange: timeRange,
        sensors: ['temperature', 'pressure', 'humidity', 'vibration']
      }
    });

    // Process and format the data
    const formattedData = {
      temperature: { current: 0, history: [] },
      pressure: { current: 0, history: [] },
      humidity: { current: 0, history: [] },
      vibration: { current: 0, history: [] }
    };

    // In a real app, we would process the API response
    // For now, generate mock data
    const now = Date.now();
    const mockData = generateMockData(now, 100);
    
    Object.keys(formattedData).forEach(sensorType => {
      formattedData[sensorType].history = mockData[sensorType];
      formattedData[sensorType].current = mockData[sensorType][mockData[sensorType].length - 1].value;
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    // Return mock data in case of error
    return generateMockDataObject();
  }
};

// Subscribe to real-time sensor updates
export const subscribeToSensorUpdates = (callback) => {
  // In a real app, this would connect to a WebSocket or use AWS AppSync
  // For demo purposes, we'll simulate updates with setInterval
  
  const interval = setInterval(() => {
    const mockUpdate = {
      temperature: {
        sensor_id: 'temp-001',
        timestamp: new Date().toISOString(),
        value: 20 + Math.random() * 10
      },
      pressure: {
        sensor_id: 'press-001',
        timestamp: new Date().toISOString(),
        value: 100 + Math.random() * 20
      },
      humidity: {
        sensor_id: 'hum-001',
        timestamp: new Date().toISOString(),
        value: 40 + Math.random() * 30
      },
      vibration: {
        sensor_id: 'vib-001',
        timestamp: new Date().toISOString(),
        value: Math.random() * 5
      }
    };
    
    callback(mockUpdate);
  }, 3000); // Update every 3 seconds
  
  // Return an object with an unsubscribe method
  return {
    unsubscribe: () => clearInterval(interval)
  };
};

// Helper function to generate mock data
const generateMockData = (endTime, points) => {
  const result = {
    temperature: [],
    pressure: [],
    humidity: [],
    vibration: []
  };
  
  for (let i = 0; i < points; i++) {
    const timestamp = new Date(endTime - (points - i) * 60000).toISOString();
    
    result.temperature.push({
      timestamp,
      value: 20 + Math.sin(i / 10) * 5 + Math.random() * 2
    });
    
    result.pressure.push({
      timestamp,
      value: 100 + Math.sin(i / 15) * 10 + Math.random() * 5
    });
    
    result.humidity.push({
      timestamp,
      value: 50 + Math.sin(i / 20) * 20 + Math.random() * 5
    });
    
    result.vibration.push({
      timestamp,
      value: 2 + Math.sin(i / 8) * 1.5 + Math.random()
    });
  }
  
  return result;
};

// Generate a complete mock data object
const generateMockDataObject = () => {
  const now = Date.now();
  const mockData = generateMockData(now, 100);
  
  return {
    temperature: {
      current: mockData.temperature[mockData.temperature.length - 1].value,
      history: mockData.temperature
    },
    pressure: {
      current: mockData.pressure[mockData.pressure.length - 1].value,
      history: mockData.pressure
    },
    humidity: {
      current: mockData.humidity[mockData.humidity.length - 1].value,
      history: mockData.humidity
    },
    vibration: {
      current: mockData.vibration[mockData.vibration.length - 1].value,
      history: mockData.vibration
    }
  };
};

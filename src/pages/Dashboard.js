import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import GaugeWidget from '../components/GaugeWidget';
import TimeGraphWidget from '../components/TimeGraphWidget';
import ChatbotWidget from '../components/ChatbotWidget';
import { fetchSensorData, subscribeToSensorUpdates } from '../services/dataService';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: { current: 0, history: [] },
    pressure: { current: 0, history: [] },
    humidity: { current: 0, history: [] },
    vibration: { current: 0, history: [] }
  });

  useEffect(() => {
    // Initial data fetch
    const loadInitialData = async () => {
      try {
        const data = await fetchSensorData();
        setSensorData(data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    loadInitialData();

    // Subscribe to real-time updates
    const subscription = subscribeToSensorUpdates((newData) => {
      setSensorData(prevData => {
        const updatedData = { ...prevData };
        
        // Update current values and history for each sensor
        Object.keys(newData).forEach(sensorType => {
          if (updatedData[sensorType]) {
            updatedData[sensorType].current = newData[sensorType].value;
            updatedData[sensorType].history = [
              ...updatedData[sensorType].history,
              {
                timestamp: newData[sensorType].timestamp,
                value: newData[sensorType].value
              }
            ].slice(-100); // Keep last 100 data points
          }
        });
        
        return updatedData;
      });
    });

    // Cleanup subscription on component unmount
    return () => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <Box className="dashboard-container">
      <Typography variant="h4" gutterBottom>
        Sensor Monitoring Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Gauge Widgets Row */}
        <Grid item xs={12} md={3}>
          <GaugeWidget 
            title="Temperature" 
            value={sensorData.temperature.current} 
            min={0} 
            max={100} 
            unit="°C" 
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <GaugeWidget 
            title="Pressure" 
            value={sensorData.pressure.current} 
            min={0} 
            max={200} 
            unit="kPa" 
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <GaugeWidget 
            title="Humidity" 
            value={sensorData.humidity.current} 
            min={0} 
            max={100} 
            unit="%" 
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <GaugeWidget 
            title="Vibration" 
            value={sensorData.vibration.current} 
            min={0} 
            max={10} 
            unit="mm/s" 
          />
        </Grid>
        
        {/* Time Graph Widgets Row */}
        <Grid item xs={12} md={6}>
          <TimeGraphWidget 
            title="Temperature History" 
            data={sensorData.temperature.history} 
            color="#ff6384" 
            unit="°C" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TimeGraphWidget 
            title="Pressure History" 
            data={sensorData.pressure.history} 
            color="#36a2eb" 
            unit="kPa" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TimeGraphWidget 
            title="Humidity History" 
            data={sensorData.humidity.history} 
            color="#4bc0c0" 
            unit="%" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TimeGraphWidget 
            title="Vibration History" 
            data={sensorData.vibration.history} 
            color="#ffcd56" 
            unit="mm/s" 
          />
        </Grid>
        
        {/* Chatbot Widget */}
        <Grid item xs={12}>
          <ChatbotWidget />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import GaugeWidget from '../components/GaugeWidget';
import TimeGraphWidget from '../components/TimeGraphWidget';
import ChatbotWidget from '../components/ChatbotWidget';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: { current: 25, history: generateFakeHistory(25, 0, 100) },
    pressure: { current: 120, history: generateFakeHistory(120, 0, 200) },
    humidity: { current: 60, history: generateFakeHistory(60, 0, 100) },
    vibration: { current: 5, history: generateFakeHistory(5, 0, 10) }
  });

  // Helper function to generate fake history data
  function generateFakeHistory(current, min, max) {
    const history = [];
    for (let i = 0; i < 100; i++) {
      history.push({
        timestamp: Date.now() - i * 1000, // Fake timestamps
        value: Math.random() * (max - min) + min // Random values within range
      });
    }
    return history.reverse(); // Ensure chronological order
  }

  return (
    <Box className="dashboard-container">
      {/* <Typography variant="h4" gutterBottom>
        Sensor Monitoring Dashboard
      </Typography> */}
      
      <Grid container spacing={3}>
        {/* Gauge Widgets Row */}{/*
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
        
        {/* Time Graph Widgets Row */}{/*
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
        */}
        {/* Chatbot Widget */}
        <Grid item xs={12}>
          <ChatbotWidget />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

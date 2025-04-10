import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import GaugeChart from 'react-gauge-chart';

const GaugeWidget = ({ title, value, min, max, unit }) => {
  // Calculate percentage for gauge (0-1)
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);
  
  return (
    <Paper className="widget" elevation={3}>
      <Typography className="widget-title" variant="h6">
        {title}
      </Typography>
      <Box className="gauge-container">
        <GaugeChart
          id={`gauge-chart-${title}`}
          nrOfLevels={20}
          percent={percentage}
          arcWidth={0.3}
          colors={['#5BE12C', '#F5CD19', '#EA4228']}
          textColor="#ffffff"
          needleColor="#90caf9"
          needleBaseColor="#90caf9"
        />
        <Typography variant="h5" sx={{ mt: 1 }}>
          {value.toFixed(1)} {unit}
        </Typography>
      </Box>
    </Paper>
  );
};

export default GaugeWidget;

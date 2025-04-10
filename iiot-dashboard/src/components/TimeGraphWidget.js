import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TimeGraphWidget = ({ title, data, color, unit }) => {
  // Format data for Chart.js
  const chartData = {
    labels: data.map(point => {
      const date = new Date(point.timestamp);
      return date.toLocaleTimeString();
    }),
    datasets: [
      {
        label: title,
        data: data.map(point => point.value),
        borderColor: color,
        backgroundColor: `${color}33`, // Add transparency
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        title: {
          display: true,
          text: unit,
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <Paper className="widget" elevation={3}>
      <Typography className="widget-title" variant="h6">
        {title}
      </Typography>
      <div className="time-graph-container">
        <Line data={chartData} options={options} />
      </div>
    </Paper>
  );
};

export default TimeGraphWidget;

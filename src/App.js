import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import './App.css';

// Configure AWS Amplify
import { Amplify } from '@aws-amplify/core';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'queryApi',
        endpoint: process.env.REACT_APP_API_GATEWAY_URL,
        region: process.env.REACT_APP_AWS_REGION
      },
      {
        name: 'askApi',
        endpoint: process.env.REACT_APP_AI_API_GATEWAY_URL,
        region: process.env.REACT_APP_AWS_REGION
      }
    ]
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

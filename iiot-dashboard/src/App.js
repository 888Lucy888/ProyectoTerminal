import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import SVG from './components/SVG';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import './App.css';
//FRAMER
import './framer/styles.css';
import GaugeChartFramerComponent from './framer/gauge-chart';
import Panel from './framer/panel';
import LineBar from './framer/line-bar';
import NavigationBar from './framer/navigation-bar';
import LeftMenu from './framer/left-menu-desktop';
import ChatbotButton from './framer/chatbot-button';
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


export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <NavigationBar />

      {/* Main content with left menu and right panel */}
      <div className="flex flex-1">
        {/* Left Menu */}
        <div className="w-64 bg-gray-900 p-4 flex-shrink-0">
          <LeftMenu />
        </div>

        {/* Right content */}
        <div className="flex-1 p-6 overflow-auto">
          <LineBar />
          <Panel data="3" />
        </div>
      </div>

      {/* Floating Chatbot Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatbotButton />
      </div>
    </div>
  );
}

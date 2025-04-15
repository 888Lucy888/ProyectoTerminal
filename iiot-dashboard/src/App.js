import React, { useState, useEffect } from 'react';
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
import LineChart from './framer/line-chart';
import TimelineChart from './framer/timeline-chart';
// Configure AWS Amplify
import { Amplify } from '@aws-amplify/core';
import ReactApexChart from "react-apexcharts";
import Text from './../node_modules/@svgdotjs/svg.js/src/elements/Text';

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for the browser's theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    // Add or remove the 'dark' class on the html element
    document.documentElement.classList.toggle('dark', mediaQuery.matches);

    // Add an event listener to detect changes in the theme
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
      document.documentElement.classList.toggle('dark', e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup the event listener on unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const [gaugeData, setGaugeData] = useState([
    {
      data: 3,
      title: "Disponibilidad",
      subdata: { operating: 17, planned: 20 },
      info: "La gráfica de Disponibilidad muestra la proporción entre el tiempo operado (en minutos) y el tiempo planificado para la producción.",
    },
    {
      data: 5,
      title: "Desempeño",
      subdata: { produced: 23, planned: 55 },
      info: "La gráfica de Desempeño representa la relación entre el número de piezas producidas y el número de piezas planificadas.",
    },
    {
      data: 7,
      title: "Calidad",
      subdata: { approved: 5, produced: 23 },
      info: "La gráfica de Calidad indica la proporción de piezas que cumplen con los estándares de calidad respecto al total de piezas producidas.",
    },
    {
      data: 9,
      title: "OEE",
      subdata: { description: "Eficiencia Operativa" },
      info: "La gráfica de OEE (Overall Equipment Effectiveness) refleja la eficiencia global del proceso y se calcula como el producto de la Disponibilidad, el Desempeño y la Calidad.",
    },
  ]);

  const [stateTimeline, setStateTimeline] = useState({
    series: [
      {
        name: "Estados de la Línea",
        data: [
          {
            x: "Estados de la Línea", // Single row label
            y: [new Date("2025-04-13T08:00:00").getTime(), new Date("2025-04-13T09:00:00").getTime()],
            fillColor: "#009908", // Green for Operación normal
            label: "Operación normal",
          },
          {
            x: "Estados de la Línea", // Single row label
            y: [new Date("2025-04-13T09:00:00").getTime(), new Date("2025-04-13T10:30:00").getTime()],
            fillColor: "#D9B918", // Yellow for Operación lenta
            label: "Operación lenta",
          },
          {
            x: "Estados de la Línea", // Single row label
            y: [new Date("2025-04-13T10:30:00").getTime(), new Date("2025-04-13T12:00:00").getTime()],
            fillColor: "#C70606", // Red for Línea detenida
            label: "Línea detenida",
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "rangeBar",
        height: 100, // Adjust height to fit a single row
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%", // Adjust bar height for better visibility
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: "HH:mm", // Format timestamps
        },
      },
      yaxis: {
        show: true, // Show Y-axis with a single label
        labels: {
          show: false,
          formatter: () => "Estados de la Línea", // Single row label
        },
      },
      tooltip: {
        custom: function (opts) {
          const from = new Date(opts.y1).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const to = new Date(opts.y2).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const label = opts.ctx.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].label;

          return `
            <div class="apexcharts-tooltip-rangebar">
              <span style="color: ${opts.color}">${label}</span>
              <div>${from} - ${to}</div>
            </div>
          `;
        },
      },
      colors: ["#28a745", "#ffc107", "#dc3545"], // Define colors for the states
    },
  });

  const [lineChartData, setLineChartData] = useState(() => {
    const data = Array.from({ length: 25 }, (_, i) => {
      const x = new Date(`2025-04-13T08:${i * 10}:00`).getTime(); // Generate timestamps every 10 minutes
      const y = Math.floor(Math.random() * 100); // Generate random percentage values
      return !isNaN(x) && !isNaN(y) ? { x, y } : null; // Filter out NaN values
    }).filter((point) => point !== null); // Remove null values

    const xMin = Math.min(...data.map((point) => point.x)); // Calculate the minimum X value
    const xMax = Math.max(...data.map((point) => point.x)); // Calculate the maximum X value

    return {
      series: [
        {
          name: "Performance",
          data,
        },
      ],
      options: {
        chart: {
          type: "line",
          height: 300,
          zoom: {
            autoScaleYaxis: true, // Automatically scale the Y-axis
          },
        },
        xaxis: {
          type: "datetime", // Use datetime for X-axis
          labels: {
            format: "HH:mm", // Format timestamps as hours and minutes
          },
          title: {
            text: "Time",
            style: {
              color: "#ffffff",
            },
          },
          min: xMin, // Dynamically set the minimum X value
          max: xMax, // Dynamically set the maximum X value
        },
        yaxis: {
          title: {
            text: "Percentage (%)",
            style: {
              color: "#ffffff",
            },
          },
          labels: {
            formatter: (value) => `${value}%`, // Append % to Y-axis labels
          },
        },
        stroke: {
          curve: "straight", // Change to straight line
          width: 2, // Line thickness
          show: true, // Ensure the line is displayed
        },
        tooltip: {
          x: {
            format: "HH:mm", // Format tooltips to show time
          },
          y: {
            formatter: (value) => `${value}%`, // Append % to tooltip values
          },
        },
        colors: ["#00A5CF"], // Set the line color to blue
      },
    };
  });

  // Function to determine the variant based on the percentage value
  const getVariant = (percentage) => {
    if (percentage >= 75) return "Green";
    if (percentage >= 50) return "Yellow";
    if (percentage >= 25) return "Red";
    return "Red 02";
  };

  // Function to generate random points for the polyline
  function generateRandomPoints() {
    const points = [];
    for (let i = 0; i <= 10; i++) {
      const x = 50 + i * 40; // X-axis spacing
      const y = 250 - Math.random() * 200; // Random Y-axis value
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  }

  return (
    <div
      className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#F2F2F2', // Set background color based on theme
      }}
    >
      {/* Top Navbar */}
      <div className={`navigation-bar-wrapper ${isDarkMode ? 'dark' : ''}`}>
        <NavigationBar style={{ width: '100%' }} />
      </div>

      {/* Main content with left menu and right panel */}
      <div className={`flex flex-1 padding ${isDarkMode ? 'dark' : ''}`}>
        {/* Left Menu */}
        <div className={`w-64 bg-gray-900 p-4 padding flex-shrink-0 ${isDarkMode ? 'dark' : ''}`}>
          <LeftMenu style={{ width: '100%' }} />
        </div>

        {/* Right content */}
        <div className={`flex-1 p-6 overflow-auto padding ${isDarkMode ? 'dark' : ''}`}>
          <div className="line-bar-container padding">
            <LineBar variant="Good" style={{ width: '100%' }} className={`${isDarkMode ? 'dark' : ''}`}/>
          </div>
          <div className="line-bar-container padding">
          <Panel variant="NOGRAPHS" style={{ width: '100%' }} />
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="gauge-container" style={{ width: '100%' }}>
              {gaugeData.map((gauge, index) => {
                const percentage = gauge.data * 10;
                const variant = getVariant(percentage);

                return (
                  <GaugeChartFramerComponent
                    style={{ width: '100%' }}
                    key={index}
                    data={`${percentage}%`}
                    title={gauge.title}
                    variant={variant}
                    info={gauge.info}
                    Text={"hu"}
                    subdata={
                      gauge.subdata.operating && gauge.subdata.planned
                        ? `${gauge.subdata.operating} min operando / ${gauge.subdata.planned} min planeados`
                        : gauge.subdata.approved && gauge.subdata.produced
                        ? `${gauge.subdata.approved} pz aprobadas / ${gauge.subdata.produced} pz producidas`
                        : gauge.subdata.produced && gauge.subdata.planned
                        ? `${gauge.subdata.produced} pz producidas / ${gauge.subdata.planned || "N/A"} pz planeadas`
                        : gauge.subdata.description || "No data available"
                    }
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col mt-4 items-center justify-center p-8">
            <div className="line-chart-wrapper">
              <div className="line-chart-container">
                <LineChart variant="NOGRAPHS" style={{ width: '100%' }} />
                <div className="line-chart-wrapper-graph">
                  <ReactApexChart
                    options={lineChartData.options}
                    series={lineChartData.series}
                    type="line"
                    style={{ width: '100%' }}
                    height={300}
                  />
                </div>
              </div>
            </div>
            <div className="time-chart-wrapper">
              <div className="line-chart-container">
                <TimelineChart variant="NOGRAPH" style={{ width: '100%' }} />
              </div>
              <div className="time-chart-wrapper-graph">
                <ReactApexChart
                  options={stateTimeline.options}
                  series={stateTimeline.series}
                  type="rangeBar"
                  style={{ width: '100%' }}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatbotButton />
      </div>
    </div>
  );
}

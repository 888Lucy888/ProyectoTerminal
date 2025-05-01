// React and Material-UI imports
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { parseISO } from 'date-fns'; 
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import './App.css';

// Framer components for UI elements
import './framer/styles.css';
import GaugeChartFramerComponent from './framer/gauge-chart';
import Panel from './framer/panel';
import LineBar from './framer/line-bar';
import NavigationBar from './framer/navigation-bar';
import LeftMenu from './framer/left-menu-desktop';
import ChatbotButton from './framer/chatbot-button';
import LineChart from './framer/line-chart';
import TimelineChart from './framer/timeline-chart';
import StationDropdown from './framer/station-dropdown';
import ShiftDropdown from './framer/shift-dropdown';

// My Components
import OEEVisualization from "./components/OEEVisualization";
import ChatWindow from "./components/ChatWindow";

// AWS Amplify configuration
import { Amplify } from '@aws-amplify/core';
import ReactApexChart from "react-apexcharts";
import { fetchOEEData } from './utils/oeeUtils';

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

// Utility function to map OEE state to a line bar variant
const getLineBarVariantFromLastState = (actualOEEstate) => {
  switch (actualOEEstate) {
    case "G": return "Good"; // Green
    case "Y": return "Low";  // Yellow
    case "R": return "Default"; // Red
    default: return "Stop";  // Fallback
  }
};

// Main App component
export default function App() {
  // State variables for theme, dropdowns, and OEE data
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [actualOEEstate, setActualOEState] = useState("G");
  const [variant, setVariant] = useState(getLineBarVariantFromLastState("G")); // Initialize with default variant

  const dynamicTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light', // Switch between light and dark modes
    },
  });

  // Update the variant whenever actualOEEstate changes
  useEffect(() => {
    const updatedVariant = getLineBarVariantFromLastState(actualOEEstate);
    setVariant(updatedVariant);
    console.log(`useEffect - actualOEEstate: ${actualOEEstate}, updatedVariant: ${updatedVariant}`); // Debug log
  }, [actualOEEstate]);

  // Debug log to check the variant during rendering
  console.log(`Render - variant: ${variant}`);

  const [station, setStation] = useState("Envasado");
  const [turno, setTurno] = useState("Turno matutino");
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).split('/').reverse().join('-')); // State for ButtonCalendar date

  const [shiftId, setShiftId] = useState(1);
  const [assetId, setAssetId] = useState(1);
  const [oeeData, setOEEData] = useState(null);
  const [availabilityReal, setAvailabilityReal] = useState(0);
  const [performanceReal, setPerformanceReal] = useState(0);
  const [qualityReal, setQualityReal] = useState(0);
  const [oeeRatio, setOEERatio] = useState(0);

  const stationToId = {
    "Envasado": 1,
    "Etiquetado": 2,
    "Sellado": 3,
  };

  const turnoToId = {
    "Turno matutino": 1,
    "Turno vespertino": 2,
    "Turno nocturno": 3,
  };

  useEffect(() => {
    const shiftId = turnoToId[turno]; // Map turno to shift ID
    const assetId = stationToId[station]; // Map station to asset ID
  
    // Format start and end times for the selected date
    const startTime = `${selectedDate} 00:00:00`;
    const endTime = `${selectedDate} 23:59:59`;
  
    // Call the API with the updated parameters
    fetchAndProcessData(shiftId, assetId, startTime, endTime);
  }, [selectedDate, station, turno]); // Dependencies to trigger the effect
  
  const [availabilityGaugeData, setAvailabilityGaugeData] = useState(0);
  const [performanceGaugeData, setPerformanceGaugeData] = useState(0);
  const [qualityGaugeData, setQualityGaugeData] = useState(0);
  const [oeeGaugeData, setOeeGaugeData] = useState(0);

  const [timestamps, setTimestamps] = useState([]);
  const [availabilityGoal, setAvailabilityGoal] = useState([]);
  const [performanceGoal, setPerformanceGoal] = useState([]);
  const [oeeGaugeDataArray, setOeeGaugeDataArray] = useState([]);
  const [availabilityGaugeDataArray, setAvailabilityGaugeDataArray] = useState([]);
  const [performanceGaugeDataArray, setPerformanceGaugeDataArray] = useState([]);
  const [qualityGaugeDataArray, setQualityGaugeDataArray] = useState([]);

  const [stateTimeline, setStateTimeline] = useState({
    series: [],
    options: {
      chart: {
        type: "rangeBar",
        height: 400, // Adjust height for better visibility
        zoom: {
          enabled: true, // Allow zooming
        },
      },
      plotOptions: {
        bar: {
          horizontal: true, // Horizontal bars
          barHeight: "80%", // Adjust bar height for better visibility
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: "HH:mm", // Format timestamps as hours and minutes
        },
        title: {
          text: "Timestamps",
        },
        min: undefined, // Will be dynamically set based on data
        max: undefined, // Will be dynamically set based on data
      },
      yaxis: {
        show: false, // Hide Y-axis labels
      },
      tooltip: {
        custom: function (opts) {
          const from = opts.y1
          ? new Date(opts.y1).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "N/A";
          const to = opts.y2
          ? new Date(opts.y2).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "N/A";

          const label =
          opts.ctx.w.config.series[opts.seriesIndex]?.data[opts.dataPointIndex]?.label || "N/A";

          return `
          <div class="apexcharts-tooltip-rangebar">
              <span style="color: ${opts.color}">${label}</span>
              <div>${from} - ${to}</div>
              </div>
          `;
        },
      },
      colors: ["#28a745", "#ffc107", "#dc3545"], // Green, Yellow, Red
    },
  });
  
  const fetchAndProcessData = async (shiftId, assetId, startTime, endTime) => {
    try {
      // Fetch data from the API
      const data = await fetchOEEData(shiftId, assetId, startTime, endTime);
      console.log("Fetched OEE Data:", data);
    
      // Validate the structure of the data
      if (!data || !data.performance || !data.quality || !data.availability) {
        console.error("Invalid data structure:", data);
        return;
      }

      // === Extract data from the new format ===
      const timestampsRaw = data.timestamps;
      console.log("Original Timestamps:", timestampsRaw);
      const timestamps = timestampsRaw.map((t) => {
        // Validate the timestamp format
        const isValidTimestamp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(t); // Regex to match the format "YYYY-MM-DD HH:mm:ss"

        if (!isValidTimestamp) {
          console.error(`Invalid timestamp format: ${t}`);
          return null;
        }

        return t; // Keep the original timestamp format
      }).filter((t) => t !== null); // Remove null entries

      console.log("Processed Timestamps:", timestamps); // Debug log
      setTimestamps(timestamps); // Update state

      const minutesGoal = data.availability.minutes_goal || 1; // Avoid division by zero
      const productionMeasures = data.performance.production_measures.map((p) => parseInt(p, 10));
      const productionGoal = data.performance.production_goal || 1; // Avoid division by zero
      const qualityMeasures = data.quality.quality_measures.map((q) => parseInt(q, 10));
      const statusLimit = parseFloat(data.status.status_limit);

      // === Initialize accumulators ===
      let availability = 0;
      let performance = 0;
      let quality = 0;

      const availabilityReal = [];
      const performanceReal = [];
      const qualityReal = [];

      // === Calculate accumulated values minute by minute ===
      for (let i = 0; i < productionMeasures.length; i++) {
        if (productionMeasures[i] > 0) {
          availability++;
        }
        performance += productionMeasures[i];
        quality += qualityMeasures[i];

        availabilityReal.push(availability);
        performanceReal.push(performance);
        qualityReal.push(quality);
      }

      // === Calculate goals and metrics ===
      const availabilityGoal = Array.from({ length: minutesGoal }, (_, i) => i + 1);
      const productionGoalPerMinute = productionGoal / minutesGoal;
      const performanceGoal = availabilityReal.map((a) =>
        Math.floor(productionGoalPerMinute * a)
      );

      const availabilityRatio = availabilityReal.map((a, i) =>
        availabilityGoal[i] ? a / availabilityGoal[i] : 0
      );
      const performanceRatio = performanceReal.map((p, i) =>
        performanceGoal[i] ? p / performanceGoal[i] : 0
      );
      const qualityRatio = qualityReal.map((q, i) =>
        performanceReal[i] ? q / performanceReal[i] : 0
      );
      const oeeRatio = availabilityRatio.map((a, i) =>
        a * performanceRatio[i] * qualityRatio[i]
      );

      // === Calculate categorical states ===
      const statesRelative = data.performance.production_measures.map((p) =>
        data.performance.production_goal ? p / (data.performance.production_goal / data.availability.minutes_goal) : 0
      );

      const states = statesRelative.map((r) => {
        if (r >= data.status.status_limit) return "G";
        if (r > 0) return "Y";
        return "R";
      });

      // Set actualOEEstate to the last value of the states array
      if (states.length > 0) {
        const lastState = states[states.length-1]; // Correctly access the last element
        setActualOEState(lastState); // Update the state
        console.log("actualOEEstate updated:", lastState); // Debug log
      }

      // Print actualOEEstate and the last value in states
      console.log("actualOEEstate:", states[states.length - 1]);
      console.log("Last value in states:", states[states.length]);

      const combinedStateTimelineData = states.map((state, index) => {
        const startTime = timestamps[index]
          ? new Date(new Date(timestamps[index]).getTime() - 6 * 60 * 60 * 1000).getTime() // Subtract 6 hours
          : null;
    
        const endTime = timestamps[index + 1]
          ? new Date(new Date(timestamps[index + 1]).getTime() - 6 * 60 * 60 * 1000).getTime() // Subtract 6 hours
          : startTime;
          
        if (!startTime || isNaN(startTime) || !endTime || isNaN(endTime)) {
          console.error(`Invalid timestamps at index ${index}:`, timestamps[index], timestamps[index + 1]);
          return null; // Skip invalid data
        }

        // Map the state to a label
        const label = state === "G" ? "Good" : state === "Y" ? "Low" : state === "R" ? "Stopped" : "N/A";

        return {
          x: "Estados de la Línea", // Single label for all data
          y: [startTime, endTime], // Time range
          fillColor: state === "G" ? "#28a745" : state === "Y" ? "#ffc107" : "#dc3545", // Green, Yellow, Red
          label, // Add the label for the tooltip
        };
      }).filter((data) => data !== null); // Remove null entries

      console.log("Combined State Timeline Data:", combinedStateTimelineData);

      // Get the first and last timestamps
      const minTimestamp = timestamps.length > 0
        ? new Date(new Date(timestamps[0]).getTime() - 6 * 60 * 60 * 1000).getTime()
        : null;

      const maxTimestamp = timestamps.length > 0
        ? new Date(new Date(timestamps[timestamps.length - 1]).getTime() - 6 * 60 * 60 * 1000).getTime()
        : null;
        
      setStateTimeline({
        series: [
          {
            name: "Estados de la Línea",
            data: combinedStateTimelineData, // Pass the combined data
          },
        ],
        options: {
          chart: {
            type: "rangeBar",
            height: 400, // Adjust height for better visibility
            zoom: {
              enabled: true, // Allow zooming
            },
          },
          plotOptions: {
            bar: {
              horizontal: true, // Horizontal bars
              barHeight: "80%", // Adjust bar height for better visibility
            },
          },
          xaxis: {
            type: "datetime", // Use datetime for X-axis
            labels: {
              format: "HH:mm", // Format timestamps as hours and minutes
            },
            title: {
              text: "Timestamps",
            },
            min: minTimestamp, // Set the minimum timestamp
            max: maxTimestamp, // Set the maximum timestamp
          },
          yaxis: {
            show: false, // Hide Y-axis labels
          },
          tooltip: {
            custom: function (opts) {
              const from = opts.y1
                ? new Date(opts.y1 + 6 * 60 * 60 * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false, // Use 24-hour format
                  })
                : "N/A";

              // Add 6 hours to the 'to' time (y2) and format it
              const to = opts.y2
                ? new Date(opts.y2 + 6 * 60 * 60 * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false, // Use 24-hour format
                  })
                : "N/A";

              const label =
                opts.ctx.w.config.series[opts.seriesIndex]?.data[opts.dataPointIndex]?.label || "N/A";

              return `
                <div class="apexcharts-tooltip-rangebar">
                  <span style="color: ${opts.color}">${label}</span>
                  <div>${from} - ${to}</div>
                </div>
              `;
            },
          },
          colors: ["#28a745", "#ffc107", "#dc3545"], // Default colors (not used if fillColor is set)
        },
      });

      // === Prepare data for ReactApexChart ===
      const availabilityChartData = availabilityReal.map((value, index) => ({
        x: timestamps[index],
        y: value,
      }));

      const performanceChartData = performanceReal.map((value, index) => ({
        x: timestamps[index],
        y: value,
      }));

      const qualityChartData = qualityReal.map((value, index) => ({
        x: timestamps[index],
        y: value,
      }));

      const oeeChartData = oeeRatio.map((value, index) => ({
        x: timestamps[index],
        y: value * 100, // Convert to percentage
      }));

      // === Store processed data in state ===
      setTimestamps(timestamps);
      setAvailabilityGoal(availabilityGoal);
      setPerformanceGoal(performanceGoal);
      setQualityGaugeDataArray(qualityReal);
      setOeeGaugeDataArray(oeeRatio);
      setAvailabilityGaugeDataArray(availabilityReal);
      setPerformanceGaugeDataArray(performanceReal);

      // Update gauge data
      setAvailabilityGaugeData(availabilityReal[availabilityReal.length - 1]);
      setPerformanceGaugeData(performanceReal[performanceReal.length - 1]);
      setQualityGaugeData(qualityReal[qualityReal.length - 1]);
      setOeeGaugeData(oeeRatio[oeeRatio.length - 1]);

      // Log processed chart data
      console.log("Chart Data:", {
        availabilityChartData,
        performanceChartData,
        qualityChartData,
        oeeChartData,
      });

      // === Update gauge data ===
      setGaugeData([
        {
          data: (availabilityRatio[availabilityRatio.length - 1] * 100).toFixed(0),
          title: "Disponibilidad",
          subdata: {
            operating: availabilityReal[availabilityReal.length - 1],
            planned: availabilityGoal[availabilityGoal.length - 1],
          },
          info: "La gráfica de Disponibilidad muestra la proporción entre el tiempo operado (en minutos) y el tiempo planificado para la producción.",
        },
        {
          data: (performanceRatio[performanceRatio.length - 1] * 100).toFixed(0),
          title: "Desempeño",
          subdata: {
            produced: performanceReal[performanceReal.length - 1],
            planned: performanceGoal[performanceGoal.length - 1],
          },
          info: "La gráfica de Desempeño representa la relación entre el número de piezas producidas y el número de piezas planificadas.",
        },
        {
          data: (qualityRatio[qualityRatio.length - 1] * 100).toFixed(0),
          title: "Calidad",
          subdata: {
            approved: qualityReal[qualityReal.length - 1],
            produced: performanceReal[performanceReal.length - 1],
          },
          info: "La gráfica de Calidad indica la proporción de piezas que cumplen con los estándares de calidad respecto al total de piezas producidas.",
        },
        {
          data: (oeeRatio[oeeRatio.length - 1] * 100).toFixed(0),
          title: "OEE",
          subdata: { description: "Eficiencia Operativa" },
          info: "La gráfica de OEE (Overall Equipment Effectiveness) refleja la eficiencia global del proceso y se calcula como el producto de la Disponibilidad, el Desempeño y la Calidad.",
        },
      ]);

      // Log gauge information
      console.log("Disponibilidad", availabilityRatio[availabilityRatio.length - 1] * 100, "%", availabilityReal[availabilityReal.length - 1], "min operando /", availabilityGoal[availabilityGoal.length - 1], "min disponibles");
      console.log("Desempeño", performanceRatio[performanceRatio.length - 1] * 100, "%", performanceReal[performanceReal.length - 1], "pz producidas /", performanceGoal[performanceGoal.length - 1], "pz producibles");
      console.log("Calidad", qualityRatio[qualityRatio.length - 1] * 100, "%", qualityReal[qualityReal.length - 1], "pz aprobadas /", performanceReal[performanceReal.length - 1], "pz producidas");
      console.log("OEE", oeeRatio[oeeRatio.length - 1] * 100, "%");
    } catch (error) {
      console.error("Error fetching or processing OEE data:", error);
    }
  };

  useEffect(() => {
    const updatedVariant = getLineBarVariantFromLastState(actualOEEstate);
    setVariant(updatedVariant);
    console.log(`useEffect - actualOEEstate: ${actualOEEstate}, updatedVariant: ${updatedVariant}`); // Debug log
  }, [actualOEEstate]);

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
      data: "Loading...",
      title: "Disponibilidad",
      subdata: { operating: "Loading...", planned: "Loading..." },
      info: "La gráfica de Disponibilidad muestra la proporción entre el tiempo operado (en minutos) y el tiempo planificado para la producción.",
    },
    {
      data: "Loading...",
      title: "Desempeño",
      subdata: { produced: "Loading...", planned: "Loading..." },
      info: "La gráfica de Desempeño representa la relación entre el número de piezas producidas y el número de piezas planificadas.",
    },
    {
      data: "Loading...",
      title: "Calidad",
      subdata: { approved: "Loading...", produced: "Loading..." },
      info: "La gráfica de Calidad indica la proporción de piezas que cumplen con los estándares de calidad respecto al total de piezas producidas.",
    },
    {
      data: "Loading...",
      title: "OEE",
      subdata: { description: "Loading..." },
      info: "La gráfica de OEE (Overall Equipment Effectiveness) refleja la eficiencia global del proceso y se calcula como el producto de la Disponibilidad, el Desempeño y la Calidad.",
    },
  ]);

  const [lineChartData, setLineChartData] = useState(() => {
    const initialData = oeeGaugeDataArray.length
      ? oeeGaugeDataArray.map((value, index) => ({
          x: timestamps[index] || "",
          y: value * 100, // Convert to percentage
        }))
      : []; // Start with no data if OEE data is not available

    return {
      series: [
        {
          name: "Eficiencia Global (OEE)",
          data: initialData,
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
          type: "category", // Use category for X-axis
          labels: {
            show: false,
            format: "HH:mm", // Format timestamps as hours and minutes
          },
        },
        yaxis: {
          title: {
            text: "Porcentaje (%)",
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

  useEffect(() => {
    if (oeeGaugeDataArray.length && timestamps.length) {
      setLineChartData({
        series: [
          {
            name: "Eficiencia Global (OEE)",
            data: oeeGaugeDataArray.map((value, index) => ({
              x: timestamps[index],
              y: value * 100, // Convert to percentage
            })),
          },
        ],
        options: {
          ...lineChartData.options,
          xaxis: { ...lineChartData.options.xaxis, categories: timestamps },
        },
      });
    }
  }, [oeeGaugeDataArray, timestamps]);

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

  const handleLineChartClick = (event) => {
    const target = event.target; // Get the target element of the event

    if (!timestamps.length) {
      console.error("Processed data is not available yet.");
      return; // Exit the function if data is not available
    }

    if (target) {
      console.log("LineChart clicked");
      console.log("Target innerText:", target.innerText); // Print the inner text of the target

      switch (target.innerText) {
        case "Disponibilidad":
          setLineChartData({
            series: [
              { name: "Meta de Disponibilidad", data: availabilityGoal.map((value, index) => ({ x: timestamps[index], y: value })) },
              { name: "Disponibilidad Real", data: availabilityGaugeDataArray.map((value, index) => ({ x: timestamps[index], y: value })) },
            ],
            options: {
              ...lineChartData.options,
              xaxis: { type: "category" },
              colors: ["#28a745", "#00A5CF"], // Green and Blue
            },
          });
          break;

        case "Desempeño":
          setLineChartData({
            series: [
              { name: "Meta de Desempeño", data: performanceGoal.map((value, index) => ({ x: timestamps[index], y: value })) },
              { name: "Desempeño Real", data: performanceGaugeDataArray.map((value, index) => ({ x: timestamps[index], y: value })) },
            ],
            options: {
              ...lineChartData.options,
              xaxis: { type: "category" },
              colors: ["#28a745", "#00A5CF"], // Green and Blue
            },
          });
          break;

        case "Calidad":
          setLineChartData({
            series: [
              { name: "Meta de Calidad", data: performanceGaugeDataArray.map((value, index) => ({ x: timestamps[index], y: value })) },
              { name: "Calidad Real", data: qualityGaugeDataArray.map((value, index) => ({ x: timestamps[index], y: value })) },
            ],
            options: {
              ...lineChartData.options,
              xaxis: { type: "category" },
              colors: ["#28a745", "#00A5CF"], // Green and Blue
            },
          });
          break;

        case "OEE %":
          setLineChartData({
            series: [{ name: "Eficiencia Global (OEE)", data: oeeGaugeDataArray.map((value, index) => ({ x: timestamps[index], y: value * 100 })) }],
            options: {
              ...lineChartData.options,
              xaxis: { type: "category" },
              colors: ["#00A5CF"],
            },
          });
          break;

        default:
          console.log("No matching text for chart update");
      }
    }
  };

  useEffect(() => {
  }, [timestamps]);

  return (
      <ThemeProvider theme={dynamicTheme}>
    <div
      className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#F2F2F2',
      }}
    >
      {/* Top Navbar */}
      <div className={`navigation-bar-wrapper ${isDarkMode ? 'dark' : ''}`}>
        <NavigationBar style={{ width: '100%' }} />
      </div>

      {/* Main content */}
      <div className={`flex flex-1 padding ${isDarkMode ? 'dark' : ''}`}>
        {/* Left Menu */}
        <div className={`w-64 bg-gray-900 p-4 padding flex-shrink-0 ${isDarkMode ? 'dark' : ''}`}>
          <LeftMenu style={{ width: '100%' }} />
        </div>

        {/* Right content */}
        <div className={`flex-1 p-6 overflow-auto padding ${isDarkMode ? 'dark' : ''}`}>
          <div className="line-bar-container padding">
            <LineBar
              variant={variant}
              style={{ width: "100%" }}
              className={`${isDarkMode ? "dark" : ""}`}
            />
          </div>
          <div className="line-bar-container padding" >
          <Panel variant="NOGRAPHS" style={{ width: '100%' }} />
          <div className="row-container">
            {/* StationDropdown */}
            <div className="row-item">
              <StationDropdown
                title={station}
                onClick={(event) => {
                  const target = event.target;
                  if (target) {
                    setStation(target.innerText);
                  }
                }}
              />
            </div>
            <div className="row-item dropdown-group">
              <ShiftDropdown
                title={turno}
                onClick={(event) => {
                    const target = event.target;
                    if (target) {
                      setTurno(target.innerText);
                    }
                  }}
              />
            </div>

            {/* Date group */}
            <div className="row-item date-group">
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                <DatePicker
                  label="Selecciona una fecha"
                  value={new Date(parseISO(selectedDate))} // Bind the selected date to the state
                  onChange={(date) => {
                    if (date) {
                      // Adjust the date to the local timezone and fix the offset issue
                      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
                      const formattedDate = localDate.toISOString().substring(0, 10); // Format as YYYY-MM-DD
                      setSelectedDate(formattedDate);
                    }
                  }}
                  renderInput={(params) => (
                    <input
                      {...params}
                      className={`custom-datepicker-input ${isDarkMode ? "dark-theme-datepicker" : ""}`}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="gauge-container" style={{ width: '100%' }}>
              {gaugeData.map((gauge, index) => {
                const percentage = gauge.data;
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
                <LineChart
                  variant="NOGRAPHS"
                  style={{ width: '100%' }}
                  onClick={handleLineChartClick}
                  text={`${station} - ${turno}`}
                  date={selectedDate}
                />
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
                <TimelineChart
                  variant="NOGRAPH"
                  style={{ width: '100%' }}
                  text={`${station} - ${turno}`}
                  date={selectedDate}
                />
              </div>
              <div className="time-chart-wrapper-graph">
                <ReactApexChart
                  options={stateTimeline.options}
                  series={stateTimeline.series}
                  type="rangeBar"
                  style={{ width: "100%" }}
                  height={400} // Adjust height for better visibility
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot Button */}
      <div className="fixed bottom-4 right-4 z-50">
          <ChatbotButton
            variant="NOCHAT"
            onClick={() => setIsChatOpen((prev) => !prev)} // Toggle chat window visibility
          />
        </div>
        <ChatWindow
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)} // Close the chat window
        />
    </div>
      </ThemeProvider>
  );
}

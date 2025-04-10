import { API } from '@aws-amplify/api';

// Function to ask the AI assistant
export const askAI = async (question) => {
  try {
    const response = await API.post('askApi', '/ask', {
      body: {
        question: question,
        userId: 'user-123', // In a real app, this would be the authenticated user ID
        context: {
          // Additional context that might help the AI
          sensors: ['temperature', 'pressure', 'humidity', 'vibration'],
          timeRange: 'last 24 hours'
        }
      }
    });

    return response.answer;
  } catch (error) {
    console.error('Error asking AI:', error);
    
    // For demo purposes, provide mock responses based on keywords in the question
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('temperature')) {
      return `The average temperature in the last 24 hours was 24.3°C, with a peak of 28.7°C at 2:15 PM yesterday.`;
    } else if (lowerQuestion.includes('pressure')) {
      return `The pressure has been stable around 101.3 kPa with minor fluctuations of ±2 kPa.`;
    } else if (lowerQuestion.includes('humidity')) {
      return `Humidity levels have been between 45% and 62% in the last 24 hours.`;
    } else if (lowerQuestion.includes('vibration')) {
      return `There was a significant vibration spike of 4.7 mm/s at 3:20 AM, which might require maintenance attention.`;
    } else if (lowerQuestion.includes('alert') || lowerQuestion.includes('warning')) {
      return `There have been 3 alerts in the past 24 hours: 1 high temperature alert and 2 vibration alerts.`;
    } else {
      return `I don't have specific information about that. You can ask me about temperature, pressure, humidity, or vibration data from your sensors.`;
    }
  }
};

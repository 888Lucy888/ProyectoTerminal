import React, { useState, useRef, useEffect } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { askAI } from '../services/aiService';

const ChatbotWidget = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your IIoT assistant. Ask me about your sensor data.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Send to AI service
      const response = await askAI(input);
      
      // Add bot response
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I couldn't process your request. Please try again.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper className="widget chat-container" elevation={3}>
      <Typography className="widget-title" variant="h6">
        AI Assistant
      </Typography>
      
      <Box className="chat-messages">
        {messages.map((message, index) => (
          <Box
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            sx={{
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              display: 'flex',
            }}
          >
            <Typography variant="body1">{message.text}</Typography>
          </Box>
        ))}
        {isLoading && (
          <Box className="message bot-message">
            <Typography variant="body1">Thinking...</Typography>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>
      
      <Box className="chat-input-container">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask about your sensor data..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <Button 
          variant="contained" 
          color="primary" 
          endIcon={<SendIcon />}
          onClick={handleSend}
          disabled={isLoading || input.trim() === ''}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatbotWidget;

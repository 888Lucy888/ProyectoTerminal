import React, { useState, useRef, useEffect } from "react";
import "./ChatWindow.css"; // Add styles for the chat window

const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]); // Chat log
  const [inputText, setInputText] = useState(""); // User input
  const chatContainerRef = useRef(null); // Reference to the chat container for scrolling

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!inputText.trim()) return; // Prevent sending empty messages

    const userMessage = { sender: "user", text: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to chat log
    setInputText(""); // Clear input field

    try {
      // Send the user message to the API
      const response = await fetch("https://your-api-endpoint.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply }; // Assume API returns { reply: "response text" }
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Add bot response to chat log
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { sender: "bot", text: "Error: Unable to send message." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  // Scroll to the bottom of the chat log whenever messages are updated
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) return null; // Do not render the chat window if it's closed

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Chat</h3>
      </div>
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe aquí..."
        />
        <button onClick={handleSendMessage} className="send-button">Enviar</button>
      </div>
    </div>
  );
};

export default ChatWindow;
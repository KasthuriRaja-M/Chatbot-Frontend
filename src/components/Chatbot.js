import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from 'date-fns';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await simulateBotResponse(inputMessage.trim());
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError('Sorry, I encountered an error. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateBotResponse = async (message) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simple response logic - replace with actual API call
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! 👋 I'm your AI assistant. How can I help you today?`;
    } else if (lowerMessage.includes('help')) {
      return `I'm here to help! You can ask me about:
      
- **General questions** - I can answer various topics
- **Code examples** - I can provide code snippets
- **Explanations** - I can explain concepts in detail
- **Problem solving** - I can help troubleshoot issues

What would you like to know?`;
    } else if (lowerMessage.includes('code') || lowerMessage.includes('javascript')) {
      return `Here's a simple JavaScript example:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World')); // Output: Hello, World!
\`\`\`

This function takes a name parameter and returns a personalized greeting.`;
    } else if (lowerMessage.includes('react') || lowerMessage.includes('component')) {
      return `Here's a simple React component example:

\`\`\`jsx
import React from 'react';

function Welcome({ name }) {
  return (
    <div className="welcome">
      <h1>Hello, {name}!</h1>
      <p>Welcome to our React application.</p>
    </div>
  );
}

export default Welcome;
\`\`\`

This component accepts a \`name\` prop and displays a welcome message.`;
    } else if (lowerMessage.includes('weather')) {
      return `I'd be happy to help with weather information! However, I don't have access to real-time weather data. You might want to check a weather service like:

- **Weather.com**
- **AccuWeather**
- **OpenWeatherMap**

Or you can ask me about other topics I can help with!`;
    } else if (lowerMessage.includes('thank')) {
      return `You're welcome! 😊 I'm glad I could help. Feel free to ask me anything else!`;
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return `Goodbye! 👋 It was nice chatting with you. Come back anytime!`;
    } else {
      return `That's an interesting question! 🤔 

I'm a demo chatbot, so my responses are limited. In a real application, I would connect to an AI service like:

- **OpenAI GPT**
- **Google Gemini**
- **Anthropic Claude**
- **Custom AI models**

For now, try asking me about:
- Hello/greetings
- Help
- Code examples
- React components
- Weather (I'll explain limitations)
- Thank you/goodbye`;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return format(timestamp, 'HH:mm');
  };

  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>AI Chatbot</h1>
        <p>Your intelligent conversation partner</p>
        <div className="chatbot-status">
          <div className="status-indicator"></div>
          <span>Online</span>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            👋 Welcome! I'm your AI assistant. How can I help you today?
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-avatar">
              {message.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className="message-content">
              <ReactMarkdown components={MarkdownComponents}>
                {message.text}
              </ReactMarkdown>
              <div className="message-time">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message bot">
            <div className="message-avatar">
              <Bot size={20} />
            </div>
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <div className="input-container">
          <div className="input-field">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              disabled={isLoading}
            />
          </div>
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

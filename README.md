# AI Chatbot Frontend

A modern, responsive React chatbot frontend with beautiful UI and smooth animations.

## Features

- 🎨 **Modern UI Design** - Beautiful gradient design with glassmorphism effects
- 💬 **Real-time Chat** - Smooth message handling with typing indicators
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- ⌨️ **Keyboard Shortcuts** - Press Enter to send, Shift+Enter for new line
- 📝 **Markdown Support** - Rich text formatting with code syntax highlighting
- ⏰ **Message Timestamps** - See when messages were sent
- 🔄 **Auto-scroll** - Automatically scrolls to latest messages
- 🎯 **Smart Input** - Auto-resizing textarea for better UX
- 🚀 **Fast & Lightweight** - Optimized performance with minimal dependencies

## Demo Responses

The chatbot currently includes demo responses for:
- Greetings (hello, hi)
- Help requests
- Code examples (JavaScript, React)
- Weather queries (with explanation of limitations)
- Thank you messages
- Goodbye messages

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Chatbot-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   └── Chatbot.js          # Main chatbot component
├── App.js                  # Root app component
├── App.css                 # Main styles
├── index.js               # Entry point
└── index.css              # Global styles

public/
├── index.html             # HTML template
└── manifest.json          # Web app manifest
```

## Customization

### Connecting to Real AI API

To connect to a real AI service, replace the `simulateBotResponse` function in `src/components/Chatbot.js` with an actual API call:

```javascript
const handleSendMessage = async () => {
  // ... existing code ...

  try {
    const response = await axios.post('YOUR_API_ENDPOINT', {
      message: inputMessage.trim(),
      // Add any other required parameters
    });
    
    const botMessage = {
      id: Date.now() + 1,
      text: response.data.message, // Adjust based on your API response
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
  } catch (err) {
    setError('Sorry, I encountered an error. Please try again.');
    console.error('Error sending message:', err);
  }
};
```

### Styling Customization

The app uses CSS custom properties and modern CSS features. You can customize:

- Colors: Modify the gradient values in `.chatbot-header` and `.send-button`
- Fonts: Change the font-family in `body` styles
- Animations: Adjust timing in CSS keyframes
- Layout: Modify container dimensions and spacing

## Dependencies

### Core Dependencies
- **React** (18.2.0) - UI library
- **React DOM** (18.2.0) - DOM rendering
- **React Scripts** (5.0.1) - Build tools

### UI & Styling
- **Lucide React** (0.294.0) - Beautiful icons
- **Framer Motion** (10.16.5) - Smooth animations

### Content & Formatting
- **React Markdown** (9.0.1) - Markdown rendering
- **React Syntax Highlighter** (15.5.0) - Code syntax highlighting
- **Date-fns** (2.30.0) - Date formatting

### HTTP Client
- **Axios** (1.6.0) - HTTP requests

### Development
- **TypeScript types** - For better development experience

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons from [Lucide React](https://lucide.dev/)
- Syntax highlighting with [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- Markdown rendering with [React Markdown](https://github.com/remarkjs/react-markdown)

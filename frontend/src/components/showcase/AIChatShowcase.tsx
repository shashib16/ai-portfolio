import React, { useState } from 'react';
import { Send, Mic, MicOff, Volume2 } from 'lucide-react';
import InProgressIndicator from './Inprogress';

interface ChatMessage {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChatShowcase: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: "Hi! I'm Shashi's AI assistant. Ask me anything about his background, skills, or projects!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const suggestions = [
    "Tell me about Shashi's experience",
    "What technologies does he use?",
    "Show me his latest projects",
    "How can I contact him?"
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        content: "That's a great question! Based on Shashi's portfolio, he has extensive experience in full-stack development with React, Python, and AI integration. He's particularly passionate about creating innovative solutions that combine modern web technologies with artificial intelligence.",
        sender: 'ai',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            AI <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Assistant</span>
          </h2>
          <p className="text-gray-400">Have a conversation about Shashi's professional journey</p>
        </div>

      <InProgressIndicator  />
        {/* Chat Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                🤖
              </div>
              <div>
                <h3 className="text-white font-semibold">Shashi's AI Assistant</h3>
                <p className="text-green-400 text-sm">● Online</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  voiceEnabled ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                <Volume2 size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestions.map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => setInputMessage(suggestion)}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Shashi..."
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={() => setIsListening(!isListening)}
                className={`p-3 rounded-lg transition-colors ${
                  isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatShowcase;
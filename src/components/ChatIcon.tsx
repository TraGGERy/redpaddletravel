'use client';

import { useState, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatMessage {
  type: 'user' | 'agent';
  text: string;
}

export default function ChatIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessages, setApiMessages] = useState<Message[]>([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Initialize with welcome message when chat is opened for the first time
  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      setChatHistory([{
        type: 'agent',
        text: 'Welcome to Redpaddle Travel and Tours! How can I assist you with your luxury travel needs today?'
      }]);
    }
  }, [isOpen, chatHistory.length]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    
    const userMessage = message.trim();
    setMessage('');
    
    // Add user message to chat history
    setChatHistory(prev => [...prev, {type: 'user', text: userMessage}]);
    
    // Add message to API messages array
    const newUserMessage: Message = { role: 'user', content: userMessage };
    const updatedMessages = [...apiMessages, newUserMessage];
    setApiMessages(updatedMessages);
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Call our API route that connects to OpenAI
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }
      
      // Add AI response to chat history
      const aiMessage = data.message;
      setChatHistory(prev => [...prev, { type: 'agent', text: aiMessage }]);
      
      // Add to API messages for context in future requests
      setApiMessages(prev => [...prev, { role: 'assistant', content: aiMessage }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setChatHistory(prev => [...prev, { 
        type: 'agent', 
        text: 'I apologize, but I encountered an error. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button 
        onClick={toggleChat}
        className="bg-amber-600 hover:bg-amber-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300"
        aria-label="Chat with us"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          {/* Chat Header */}
          <div className="bg-amber-600 text-white p-4">
            <h3 className="font-bold">Redpaddle Travel Support</h3>
            <p className="text-sm text-amber-100">We typically reply within minutes</p>
          </div>
          
          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            {(
              <div className="space-y-4">
                {chatHistory.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${msg.type === 'user' 
                        ? 'bg-amber-600 text-white rounded-br-none' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-r-lg transition-colors flex items-center justify-center w-10 h-10"
                disabled={!message.trim() || isLoading}
              >
                {isLoading ? (
                  <BiLoaderAlt className="animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
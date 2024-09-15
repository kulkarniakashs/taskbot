"use client"
import { geminiAPI } from '@/Action/geminiAPI';
import Navbar from '@/components/Navbar';
import TextWithStyles from '@/components/TextWithStyle';
import { useState, useEffect, useRef } from 'react';
export default function Chatbot() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const chatWindowRef = useRef(null); // Create a ref for the chat window

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async() => {
    if (message.trim() !== '') {
      const newMessage = { sender: 'User', text: message };
      let data = {"contents":[{"parts":[{"text":message}]}]}
      setChat([...chat, newMessage]);
      setMessage('');
      let botReply = await geminiAPI(data);
      // Simulate bot reply
      const botMessage = { sender: 'Bot', text: botReply };
      setChat((prevChat) => [...prevChat, botMessage]);
    }
  };

  // Scroll to the latest message when chat updates
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-start min-h-[90vh] bg-gray-100">
      <div className="w-full max-w-[65vw] p-5 bg-white rounded-lg shadow-lg mt-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center mb-2">Chatbot</h2>
          <div
            id="chatWindow"
            className="h-80 overflow-y-auto border border-gray-300 rounded p-4 bg-gray-50 h-96"
            ref={chatWindowRef} // Attach the ref to the chat window
          >
            {chat.map((chatMessage, index) => (
              <div
                key={index}
                className={`mb-2 ${chatMessage.sender === 'User' ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    chatMessage.sender === 'User' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                  }`}
                >
                  {/* {chatMessage.text} */}
                  <TextWithStyles text = {chatMessage.text}/>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

"use client"
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function Summarize() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSummary('');

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('text', text);
    }

    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get summary.');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get summary. Make sure the Flask server is running.');
    }
  };

  return (
    <div>
        <Navbar/>
      <h1 className="text-center font-extrabold font-serif text-4xl m-5">Summarize Text</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-around items-center">
          <textarea
            rows="6"
            cols="50"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text to summarize"
            className="border border-gray-800 p-2 rounded"
          />

          <div>
            <p className="text-5xl font-semibold">or</p>
          </div>

          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-800">Get Summary</button>
        </div>
      </form>

      {summary && (
        <div className="flex flex-col justify-center items-center m-5">
          <h2>Summary</h2>
          <p className="max-w-[80vw]">{summary}</p>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
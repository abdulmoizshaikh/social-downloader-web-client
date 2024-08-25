import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setFile('');

    try {
      const response = await fetch('http://localhost:5000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFile(data.file);
      } else {
        setMessage(data);
      }
    } catch (err) {
      setMessage('Error downloading video.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>YouTube Video Downloader</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            required
          />
          <button type="submit">Download</button>
        </form>
        {message && <p>{message}</p>}
        {file && (
          <a href={`http://localhost:5000/youtube/${file}`} download>
            Download {file}
          </a>
        )}
      </header>
    </div>
  );
}

export default App;

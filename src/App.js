import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleDownload = async () => {
    try {
      // Replace with the actual third-party API endpoint
      const response = await axios.post('https://api.example.com/download', { url });
      setDownloadLink(response.data.downloadLink);
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

  return (
    <div className="App">
      <h1>YouTube Video Downloader</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube video URL"
      />
      <button onClick={handleDownload}>Download</button>
      {downloadLink && (
        <a href={downloadLink} download>
          Click here to download your video
        </a>
      )}
    </div>
  );
}

export default App;

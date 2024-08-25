import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);

  const getVideoInfo = async () => {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=${url}&format=json`);
      const info = await response.json();
      setVideoInfo(info);
    } catch (error) {
      console.error('Error fetching video info:', error.message);
    }
  };

  const downloadVideo = () => {
    if (url) {
      window.open(`http://localhost:5000/download?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <div className="App">
      <h1>YouTube Video Downloader</h1>
      <label>
        Enter YouTube Video URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <button onClick={getVideoInfo}>Get Video Info</button>

      {videoInfo && (
        <div>
          <h2>Video Information</h2>
          <p>Title: {videoInfo.title}</p>
          <p>Author: {videoInfo.author_name}</p>
          <p>Duration: {videoInfo.duration} seconds</p>
          <button onClick={downloadVideo}>Download Video</button>
        </div>
      )}
    </div>
  );
}

export default App;

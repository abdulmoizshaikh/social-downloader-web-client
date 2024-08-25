// src/YTVideoDownloader.js
import React, { useState } from 'react';
import '../../App.css';

const YTVideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);

  const getVideoInfo = async () => {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=${url}&format=json`
      );
      const info = await response.json();
      setVideoInfo(info);
    } catch (error) {
      console.error('Error fetching video info:', error.message);
    }
  };

  const downloadVideo = () => {
    if (url) {
      window.open(
        `http://localhost:5000/download?url=${encodeURIComponent(url)}`
      );
    }
  };

  return (
    <div className="youtube-downloader">
      <div>
        <input
          placeholder="Enter YouTube Video URL"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={getVideoInfo}>Get Video Info</button>
      </div>

      {videoInfo && (
        <div className="video-info">
          <h2>Video Information</h2>
          <p>
            <strong>Title:</strong> {videoInfo.title}
          </p>
          <p>
            <strong>Author:</strong> {videoInfo.author_name}
          </p>
          <p>
            <strong>Duration:</strong> {videoInfo.duration} seconds
          </p>
          <button onClick={downloadVideo}>Download Video</button>
        </div>
      )}
    </div>
  );
};

export default YTVideoDownloader;

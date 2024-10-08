// src/YTVideoDownloader.js
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; // Make sure this CSS file includes styles for the spinner

const YTVideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const getVideoInfo = async () => {
    if (!url) {
      toast.error('Please enter a valid YouTube URL.');
      return;
    }

    setLoading(true);
    setVideoInfo(null);

    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=${url}&format=json`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch video info.');
      }
      const info = await response.json();
      setVideoInfo(info);
    } catch (error) {
      console.error('Error fetching video info:', error.message);
      toast.error('Error fetching video info. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = () => {
    if (!url) {
      toast.error('Please enter a valid YouTube URL.');
      return;
    }

    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const YT_DOWNLOAD = 'yt-download';
    const API_URL = `${BASE_URL}/${YT_DOWNLOAD}?url=${encodeURIComponent(url)}`;
    // console.log('API_URL', API_URL);
    window.open(API_URL);
    // setUrl('');
    // setVideoInfo(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getVideoInfo();
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
          onKeyDown={handleKeyDown}
        />
        {/* <button onClick={getVideoInfo}>Get Video Info</button> */}
        <button className="youtube-button" onClick={downloadVideo}>
          Download
        </button>
      </div>

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {!loading && videoInfo && (
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
          <button className="youtube-button" onClick={downloadVideo}>
            Download Video
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default YTVideoDownloader;

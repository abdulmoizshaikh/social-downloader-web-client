import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; // Ensure this CSS file includes updated LinkedIn styles

const LinkedInVideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const getVideoInfo = async () => {
    if (!url) {
      toast.error('Please enter a valid LinkedIn Video URL.');
      return;
    }

    setLoading(true);
    setVideoInfo(null);

    try {
      // Fetch LinkedIn video details (placeholder logic)
      const response = await fetch(
        `https://www.linkedin.com/video-fetch?url=${url}`
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
      toast.error('Please enter a valid LinkedIn Video URL.');
      return;
    }

    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const LI_DOWNLOAD = 'linkedin-download-direct';
    const API_URL = `${BASE_URL}/${LI_DOWNLOAD}?url=${encodeURIComponent(url)}`;
    window.open(API_URL);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getVideoInfo();
    }
  };

  return (
    <div className="linkedin-downloader">
      <div>
        <input
          placeholder="Enter LinkedIn Video URL"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className='linkedin-button' onClick={downloadVideo}>Download</button>
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
          <button className='linkedin-button' onClick={downloadVideo}>Download Video</button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default LinkedInVideoDownloader;

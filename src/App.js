import React from 'react';
import './App.css';
import { LinkedInVideoDownloader, YTVideoDownloader } from './components';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="video-downloader">
          <h1>YouTube Video Downloader</h1>
          <YTVideoDownloader />
        </div>

        <div className="divider"></div>

        <div className="video-downloader">
          <h1>LinkedIn Video Downloader</h1>
          <LinkedInVideoDownloader />
        </div>
      </div>
    </div>
  );
}

export default App;

// src/App.js
import React from 'react';
import './App.css';
import { LinkedInVideoDownloader, YTVideoDownloader } from './components';

function App() {
  return (
    <div className="App">
      <h1>YouTube Video Downloader</h1>
      <YTVideoDownloader />

      <h1>LinkedIn Video Downloader</h1>
      <LinkedInVideoDownloader />

    </div>
  );
}

export default App;

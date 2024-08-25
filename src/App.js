import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Typography, Container, Box, Link } from '@mui/material';

function App() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setFile('');
    setLoading(true);

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
        setMessage('Download successful!');
        setFile(data.file);
      } else {
        setMessage('Failed to download video.');
      }
    } catch (err) {
      setMessage('Error downloading video.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: 3,
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontWeight: 600 }}>
          YouTube Video Downloader
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginBottom: '1rem' }}>
          <TextField
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            required
            sx={{
              marginBottom: 2,
              backgroundColor: '#fff',
              borderRadius: '5px',
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontWeight: 'bold', padding: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Download'}
          </Button>
        </form>
        {message && (
          <Typography
            variant="body1"
            sx={{
              color: '#f44336',
              fontWeight: 500,
              marginBottom: 2,
            }}
          >
            {message}
          </Typography>
        )}
        {file && (
          <Link
            href={`http://localhost:5000/youtube/${file}`}
            download
            sx={{ textDecoration: 'none', color: '#2196f3', fontWeight: 500 }}
          >
            Download {file}
          </Link>
        )}
      </Box>
    </Container>
  );
}

export default App;

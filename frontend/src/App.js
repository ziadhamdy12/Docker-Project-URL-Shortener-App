import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const shortenUrl = async () => {

    const res = await axios.post(
      'http://localhost:5000/shorten',
      { url }
    );

    setShortUrl(res.data.shortUrl);
  };

  return (
    <div style={{ padding: 40 }}>

      <h1>Docker URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          width: '300px',
          marginRight: '10px'
        }}
      />

      <button onClick={shortenUrl}>
        Shorten
      </button>

      {shortUrl && (
        <div style={{ marginTop: 20 }}>
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
          >
            {shortUrl}
          </a>
        </div>
      )}

    </div>
  );
}

export default App;
import React, { useState } from 'react';
import axios from 'axios';
import './CharacterCounter.css';

function CharacterCounter() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:3000/api/character-counter';

  const countCharacters = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // For shorter text, use GET endpoint with query parameter
      if (text.length < 500) {
        const response = await axios.get(`${API_BASE_URL}/count?text=${encodeURIComponent(text)}`);
        setResult(response.data);
      } else {
        // For longer text, use POST endpoint with request body
        const response = await axios.post(`${API_BASE_URL}/count`, { text });
        setResult(response.data);
      }
    } catch (err) {
      console.error('Error counting characters:', err);
      setError(`Failed to count characters: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    // Clear results when text changes
    if (result) {
      setResult(null);
    }
  };

  const clearText = () => {
    setText('');
    setResult(null);
    setError('');
  };

  return (
    <div className="character-counter-container">
      <h2 className="character-counter-title">Character Counter</h2>

      {error && <div className="character-counter-error-message">{error}</div>}

      <div className="character-counter-form">
        <div className="character-counter-input-group">
          <label className="character-counter-label" htmlFor="text">Text:</label>
          <textarea
            className="character-counter-textarea"
            id="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text to analyze..."
            rows={5}
          />
        </div>
      </div>

      <div className="character-counter-button-group">
        <button 
          className="character-counter-button"
          onClick={countCharacters} 
          disabled={loading}
        >
          Count Characters
        </button>
        <button 
          className="character-counter-button character-counter-button-secondary"
          onClick={clearText} 
          disabled={loading}
        >
          Clear
        </button>
      </div>

      {loading && <p>Analyzing text...</p>}

      {result && (
        <div className="character-counter-result-container">
          <h3 className="character-counter-result-title">Character Analysis</h3>
          <div className="character-counter-result-grid">
            <div className="character-counter-result-item">
              <span className="character-counter-result-label">Total Characters:</span>
              <span className="character-counter-result-value">{result.totalCount}</span>
            </div>
            <div className="character-counter-result-item">
              <span className="character-counter-result-label">Without Spaces:</span>
              <span className="character-counter-result-value">{result.withoutSpaces}</span>
            </div>
            <div className="character-counter-result-item">
              <span className="character-counter-result-label">Alphabetic:</span>
              <span className="character-counter-result-value">{result.alphabetic}</span>
            </div>
            <div className="character-counter-result-item">
              <span className="character-counter-result-label">Numeric:</span>
              <span className="character-counter-result-value">{result.numeric}</span>
            </div>
            <div className="character-counter-result-item">
              <span className="character-counter-result-label">Special Characters:</span>
              <span className="character-counter-result-value">{result.special}</span>
            </div>
            <div className="character-counter-result-item">
              <span className="character-counter-result-label">Uppercase:</span>
              <span className="character-counter-result-value">{result.uppercase}</span>
            </div>
            <div className="character-counter-result-item">
              <span className="character-counter-result-label">Lowercase:</span>
              <span className="character-counter-result-value">{result.lowercase}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterCounter;
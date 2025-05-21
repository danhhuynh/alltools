import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countCharactersAsync, clearCharacterCounterError, clearCharacterCounterResult, setError } from '../store/characterCounterSlice';
import './CharacterCounter.css';

function CharacterCounter() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const { result, loading, error } = useSelector(state => state.characterCounter);

  const countCharacters = () => {
    if (!text.trim()) {
      dispatch(clearCharacterCounterError());
      dispatch(setError('Please enter some text to analyze'));
      return;
    }

    dispatch(clearCharacterCounterError());
    dispatch(countCharactersAsync(text));
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    // Clear results when text changes
    if (result) {
      dispatch(clearCharacterCounterResult());
    }
  };

  const clearText = () => {
    setText('');
    dispatch(clearCharacterCounterResult());
    dispatch(clearCharacterCounterError());
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

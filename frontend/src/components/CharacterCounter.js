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
    <article className="character-counter-container">
      <h2 className="character-counter-title">Character Counter</h2>

      {error && (
        <aside role="alert" aria-live="assertive" className="character-counter-error-message">
          {error}
        </aside>
      )}

      <form className="character-counter-form" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="character-counter-input-group">
          <legend className="visually-hidden">Text Analysis Input</legend>
          <label className="character-counter-label" htmlFor="text">Text:</label>
          <textarea
            className="character-counter-textarea"
            id="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text to analyze..."
            rows={5}
            aria-describedby="text-hint"
          />
          <small id="text-hint" className="character-counter-hint">Enter any text to analyze its character composition</small>
        </fieldset>

        <div className="character-counter-button-group" role="group" aria-label="Text analysis actions">
          <button 
            className="character-counter-button"
            onClick={countCharacters} 
            disabled={loading}
            type="button"
            aria-label="Analyze text"
          >
            Count Characters
          </button>
          <button 
            className="character-counter-button character-counter-button-secondary"
            onClick={clearText} 
            disabled={loading}
            type="button"
            aria-label="Clear text input"
          >
            Clear
          </button>
        </div>
      </form>

      {loading && <p aria-live="polite" role="status">Analyzing text...</p>}

      {result && (
        <section className="character-counter-result-container" aria-live="polite">
          <h3 className="character-counter-result-title">Character Analysis</h3>
          <dl className="character-counter-result-grid">
            <div className="character-counter-result-item">
              <dt className="character-counter-result-label">Total Characters:</dt>
              <dd className="character-counter-result-value">{result.totalCount}</dd>
            </div>
            <div className="character-counter-result-item">
              <dt className="character-counter-result-label">Without Spaces:</dt>
              <dd className="character-counter-result-value">{result.withoutSpaces}</dd>
            </div>
            <div className="character-counter-result-item">
              <dt className="character-counter-result-label">Alphabetic:</dt>
              <dd className="character-counter-result-value">{result.alphabetic}</dd>
            </div>
            <div className="character-counter-result-item">
              <dt className="character-counter-result-label">Numeric:</dt>
              <dd className="character-counter-result-value">{result.numeric}</dd>
            </div>
            <div className="character-counter-result-item">
              <dt className="character-counter-result-label">Special Characters:</dt>
              <dd className="character-counter-result-value">{result.special}</dd>
            </div>
            <div className="character-counter-result-item">
              <dt className="character-counter-result-label">Uppercase:</dt>
              <dd className="character-counter-result-value">{result.uppercase}</dd>
            </div>
            <div className="character-counter-result-item">
              <dt className="character-counter-result-label">Lowercase:</dt>
              <dd className="character-counter-result-value">{result.lowercase}</dd>
            </div>
          </dl>
        </section>
      )}
    </article>
  );
}

export default CharacterCounter;

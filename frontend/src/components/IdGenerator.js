import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateIdAsync, clearIdGeneratorError } from '../store/idGeneratorSlice';
import './IdGenerator.css';

function IdGenerator() {
  const [prefix, setPrefix] = useState('');

  const dispatch = useDispatch();
  const { generatedId, idType, loading, error } = useSelector(state => state.idGenerator);

  const generateId = (type) => {
    dispatch(clearIdGeneratorError());
    dispatch(generateIdAsync({ type, prefix }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedId)
      .then(() => {
        alert('ID copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <article className="id-generator-container">
      <h2 className="id-generator-title">ID Generator</h2>

      {error && (
        <aside role="alert" aria-live="assertive" className="id-generator-error-message">
          {error}
        </aside>
      )}

      <form className="id-generator-form" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="id-generator-input-group">
          <legend className="visually-hidden">ID Generator Options</legend>
          <label className="id-generator-label" htmlFor="prefix">Prefix:</label>
          <input
            className="id-generator-input"
            id="prefix"
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder="Optional prefix (e.g., user_)"
            aria-describedby="prefix-hint"
          />
          <small id="prefix-hint" className="id-generator-hint">Add an optional prefix to your generated ID</small>
        </fieldset>

        <div className="id-generator-button-group" role="group" aria-label="ID generation options">
          <button 
            className="id-generator-button"
            onClick={() => generateId('unique')} 
            disabled={loading}
            type="button"
            aria-label="Generate Standard ID"
          >
            Generate Standard ID
          </button>
          <button 
            className="id-generator-button"
            onClick={() => generateId('short')} 
            disabled={loading}
            type="button"
            aria-label="Generate Short ID"
          >
            Generate Short ID
          </button>
          <button 
            className="id-generator-button"
            onClick={() => generateId('uuid')} 
            disabled={loading}
            type="button"
            aria-label="Generate UUID"
          >
            Generate UUID
          </button>
        </div>
      </form>

      {loading && <p aria-live="polite" role="status">Generating...</p>}

      {generatedId && (
        <section className="id-generator-result-container" aria-live="polite">
          <h3 className="id-generator-result-title">
            {idType === 'unique' && 'Standard Unique ID'}
            {idType === 'short' && 'Short Unique ID'}
            {idType === 'uuid' && 'UUID v4'}
          </h3>
          <output className="id-generator-result-text" aria-label="Generated ID">{generatedId}</output>
          <button 
            className="id-generator-button" 
            onClick={copyToClipboard}
            type="button"
            aria-label="Copy ID to clipboard"
          >
            Copy to Clipboard
          </button>
        </section>
      )}
    </article>
  );
}

export default IdGenerator;

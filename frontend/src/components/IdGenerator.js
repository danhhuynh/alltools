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
    <div className="id-generator-container">
      <h2 className="id-generator-title">ID Generator</h2>

      {error && <div className="id-generator-error-message">{error}</div>}

      <div className="id-generator-form">
        <div className="id-generator-input-group">
          <label className="id-generator-label" htmlFor="prefix">Prefix:</label>
          <input
            className="id-generator-input"
            id="prefix"
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder="Optional prefix (e.g., user_)"
          />
        </div>
      </div>

      <div className="id-generator-button-group">
        <button 
          className="id-generator-button"
          onClick={() => generateId('unique')} 
          disabled={loading}
        >
          Generate Standard ID
        </button>
        <button 
          className="id-generator-button"
          onClick={() => generateId('short')} 
          disabled={loading}
        >
          Generate Short ID
        </button>
        <button 
          className="id-generator-button"
          onClick={() => generateId('uuid')} 
          disabled={loading}
        >
          Generate UUID
        </button>
      </div>

      {loading && <p>Generating...</p>}

      {generatedId && (
        <div className="id-generator-result-container">
          <h3 className="id-generator-result-title">
            {idType === 'unique' && 'Standard Unique ID'}
            {idType === 'short' && 'Short Unique ID'}
            {idType === 'uuid' && 'UUID v4'}
          </h3>
          <p className="id-generator-result-text">{generatedId}</p>
          <button className="id-generator-button" onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}

export default IdGenerator;

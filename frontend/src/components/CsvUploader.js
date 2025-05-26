import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCsvAsync, clearCsvUploaderError } from '../store/csvUploaderSlice';
import PieChartDisplay from './PieChartDisplay';
import LineChartDisplay from './LineChartDisplay';
import './CsvUploader.css';

function CsvUploader() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const dispatch = useDispatch();
  const { uploadResult, loading, error } = useSelector(state => state.csvUploader);

  // Function to detect if data is time-series (has Date column)
  const isTimeSeriesData = (data) => {
    if (!data || data.length === 0) return false;

    // Check if first row has a Date column or any column with date-like name
    const firstRow = data[0];
    return Object.keys(firstRow).some(key => 
      key === 'Date' || 
      key.toLowerCase().includes('date') || 
      key.toLowerCase().includes('time') || 
      key.toLowerCase().includes('month') ||
      key.toLowerCase().includes('year')
    );
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Check if file is CSV
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        dispatch(clearCsvUploaderError());
        dispatch({ type: 'csvUploader/setError', payload: 'Please select a CSV file' });
        setFile(null);
        setFileName('');
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);

      // Clear previous results when a new file is selected
      if (uploadResult) {
        dispatch({ type: 'csvUploader/clearResult' });
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      dispatch(clearCsvUploaderError());
      dispatch({ type: 'csvUploader/setError', payload: 'Please select a file to upload' });
      return;
    }

    dispatch(clearCsvUploaderError());
    dispatch(uploadCsvAsync(file));
  };

  const clearFile = () => {
    setFile(null);
    setFileName('');
    dispatch(clearCsvUploaderError());
    dispatch({ type: 'csvUploader/clearResult' });
  };

  return (
    <article className="csv-uploader-container">
      <h2 className="csv-uploader-title">CSV Chart Visualizer</h2>

      {error && (
        <aside role="alert" aria-live="assertive" className="csv-uploader-error-message">
          {error}
        </aside>
      )}

      <form className="csv-uploader-form" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="csv-uploader-input-group">
          <legend className="visually-hidden">CSV File Upload</legend>
          <label className="csv-uploader-label" htmlFor="csv-file">Select CSV File:</label>
          <div className="csv-uploader-file-input-container">
            <input
              className="csv-uploader-file-input"
              id="csv-file"
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              aria-describedby="csv-file-hint"
            />
            <small id="csv-file-hint" className="csv-uploader-hint">
              Select a CSV file to upload (max size: 5MB)
              <br />
              <strong>Supported CSV formats:</strong>
              <div className="csv-format-examples">
                <div>
                  <h4>Category Data (Pie Chart):</h4>
                  <pre className="csv-format-example">
Category,Value
Electronics,35
Groceries,25
Clothing,15
Home & Kitchen,10
Books,8
Other,7
                  </pre>
                </div>
                <div>
                  <h4>Time Series Data (Line Chart):</h4>
                  <pre className="csv-format-example">
Date,Sales
2024-01,120
2024-02,150
2024-03,180
2024-04,170
2024-05,210
2024-06,190
                  </pre>
                </div>
              </div>
            </small>
          </div>
        </fieldset>

        {fileName && (
          <div className="csv-uploader-selected-file">
            <span className="csv-uploader-selected-file-name">Selected file: {fileName}</span>
          </div>
        )}

        <div className="csv-uploader-button-group" role="group" aria-label="CSV upload actions">
          <button 
            className="csv-uploader-button"
            onClick={handleUpload} 
            disabled={loading || !file}
            type="button"
            aria-label="Upload CSV file"
          >
            Upload CSV
          </button>
          <button 
            className="csv-uploader-button csv-uploader-button-secondary"
            onClick={clearFile} 
            disabled={loading || !file}
            type="button"
            aria-label="Clear selected file"
          >
            Clear
          </button>
        </div>
      </form>

      {loading && <p aria-live="polite" role="status">Uploading file...</p>}

      {uploadResult && (
        <section className="csv-uploader-result-container" aria-live="polite">
          <h3 className="csv-uploader-result-title">Upload Result</h3>
          <div className="csv-uploader-result-message">
            {uploadResult.success ? (
              <>
                <p className="csv-uploader-success-message">
                  File uploaded successfully! {uploadResult.message}
                </p>
                {uploadResult.preview && uploadResult.preview.length > 0 && (
                  isTimeSeriesData(uploadResult.preview) ? (
                    <LineChartDisplay data={uploadResult.preview} />
                  ) : (
                    <PieChartDisplay data={uploadResult.preview} />
                  )
                )}
              </>
            ) : (
              <p className="csv-uploader-error-message">
                Upload failed: {uploadResult.message}
              </p>
            )}
          </div>
        </section>
      )}
    </article>
  );
}

export default CsvUploader;

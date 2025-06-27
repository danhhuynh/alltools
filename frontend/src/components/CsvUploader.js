import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCsvAsync, clearCsvUploaderError } from '../store/csvUploaderSlice';
import PieChartDisplay from './PieChartDisplay';
import LineChartDisplay from './LineChartDisplay';
import BarChartDisplay from './BarChartDisplay';
import ScatterPlotDisplay from './ScatterPlotDisplay';
import './CsvUploader.css';

function CsvUploader() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [preferredChartType, setPreferredChartType] = useState('bar'); // Default to bar chart

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

  // Function to detect if data is suitable for a scatter plot (has X and Y columns)
  const isScatterPlotData = (data) => {
    if (!data || data.length === 0) return false;

    // Check if first row has X and Y columns or similar
    const firstRow = data[0];
    const hasXColumn = Object.keys(firstRow).some(key => 
      key === 'X' || 
      key.toLowerCase() === 'x' || 
      key.toLowerCase().includes('xaxis') || 
      key.toLowerCase().includes('xvalue')
    );

    const hasYColumn = Object.keys(firstRow).some(key => 
      key === 'Y' || 
      key.toLowerCase() === 'y' || 
      key.toLowerCase().includes('yaxis') || 
      key.toLowerCase().includes('yvalue')
    );

    return hasXColumn && hasYColumn;
  };

  // Function to detect chart type based on data structure
  const detectChartType = (data) => {
    if (!data || data.length === 0) return preferredChartType; // Use preferred chart type as default

    if (isTimeSeriesData(data)) {
      return 'line';
    } else if (isScatterPlotData(data)) {
      return 'scatter';
    } else {
      // For categorical data, use the user's preferred chart type
      return preferredChartType;
    }
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
                  <h4>Category Data (Pie/Bar Chart):</h4>
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
                <div>
                  <h4>Coordinate Data (Scatter Plot):</h4>
                  <pre className="csv-format-example">
X,Y
10,20
15,35
25,40
30,25
45,50
60,45
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
                  <>
                    {/* Chart type selector - only show for categorical data */}
                    {!isTimeSeriesData(uploadResult.preview) && !isScatterPlotData(uploadResult.preview) && (
                      <div className="chart-type-selector">
                        <label>Chart Type: </label>
                        <div className="chart-type-buttons">
                          <button 
                            className={`chart-type-button ${preferredChartType === 'bar' ? 'active' : ''}`}
                            onClick={() => setPreferredChartType('bar')}
                          >
                            Bar Chart
                          </button>
                          <button 
                            className={`chart-type-button ${preferredChartType === 'pie' ? 'active' : ''}`}
                            onClick={() => setPreferredChartType('pie')}
                          >
                            Pie Chart
                          </button>
                        </div>
                      </div>
                    )}
                    {(() => {
                      const chartType = detectChartType(uploadResult.preview);
                      switch (chartType) {
                        case 'line':
                          return <LineChartDisplay data={uploadResult.preview} />;
                        case 'bar':
                          return <BarChartDisplay data={uploadResult.preview} />;
                        case 'scatter':
                          return <ScatterPlotDisplay data={uploadResult.preview} />;
                        case 'pie':
                          return <PieChartDisplay data={uploadResult.preview} />;
                        default:
                          return <BarChartDisplay data={uploadResult.preview} />;
                      }
                    })()}
                  </>
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

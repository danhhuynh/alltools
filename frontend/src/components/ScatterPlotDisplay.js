import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ScatterPlotDisplay.css';

function ScatterPlotDisplay({ data }) {
  // If no data is provided, return null
  if (!data || data.length === 0) {
    return null;
  }

  // Format data for the scatter plot
  // Expecting data in format: [{ X: '10', Y: '20' }, ...]
  const chartData = data.map(item => {
    // Try to find X and Y columns
    const xKey = item.X ? 'X' : Object.keys(item).find(key => 
      key.toLowerCase() === 'x' || 
      key.toLowerCase().includes('xaxis') || 
      key.toLowerCase().includes('xvalue')
    ) || Object.keys(item)[0];
    
    const yKey = item.Y ? 'Y' : Object.keys(item).find(key => 
      key.toLowerCase() === 'y' || 
      key.toLowerCase().includes('yaxis') || 
      key.toLowerCase().includes('yvalue')
    ) || Object.keys(item)[1] || Object.keys(item)[0];

    return {
      x: parseFloat(item[xKey]) || 0,
      y: parseFloat(item[yKey]) || 0
    };
  });

  return (
    <div className="scatter-plot-container">
      <h3 className="scatter-plot-title">Scatter Plot Visualization</h3>
      <p className="scatter-plot-description">
        The scatter plot below visualizes the data from your CSV file. Each point represents a pair of X and Y values.
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="X" 
            label={{ value: 'X Value', position: 'insideBottomRight', offset: -10 }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Y" 
            label={{ value: 'Y Value', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter 
            name="Data Points" 
            data={chartData} 
            fill="#8884d8" 
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ScatterPlotDisplay;
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './LineChartDisplay.css';

function LineChartDisplay({ data }) {
  // If no data is provided, return null
  if (!data || data.length === 0) {
    return null;
  }

  // Format data for the line chart
  // Expecting data in format: [{ Date: '2024-01', Sales: '120' }, ...]
  const chartData = data.map(item => {
    // Try to find Date and Sales/Value columns
    const dateKey = item.Date ? 'Date' : Object.keys(item).find(key => 
      key.toLowerCase().includes('date') || 
      key.toLowerCase().includes('time') || 
      key.toLowerCase().includes('month') ||
      key.toLowerCase().includes('year')
    ) || Object.keys(item)[0];
    
    const valueKey = item.Sales ? 'Sales' : 
      item.Value ? 'Value' : 
      Object.keys(item).find(key => 
        key.toLowerCase().includes('sales') || 
        key.toLowerCase().includes('value') || 
        key.toLowerCase().includes('amount') ||
        key.toLowerCase().includes('revenue')
      ) || Object.keys(item)[1] || Object.keys(item)[0];

    return {
      date: item[dateKey] || 'Unknown',
      value: parseFloat(item[valueKey]) || 0
    };
  });

  return (
    <div className="line-chart-container">
      <h3 className="line-chart-title">Time Series Visualization</h3>
      <p className="line-chart-description">
        The line chart below visualizes the time series data from your CSV file. The x-axis represents dates, and the y-axis shows the corresponding values.
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            label={{ value: 'Date', position: 'insideBottomRight', offset: -10 }}
          />
          <YAxis 
            label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name="Sales"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartDisplay;
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './BarChartDisplay.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#6B66FF'];

function BarChartDisplay({ data }) {
  // If no data is provided, return null
  if (!data || data.length === 0) {
    return null;
  }

  // Format data for the bar chart
  // Expecting data in format: [{ Category: 'Electronics', Value: '35' }, ...]
  const chartData = data.map(item => {
    // Try to find Category and Value columns
    const categoryKey = item.Category ? 'Category' : Object.keys(item)[0];
    const valueKey = item.Value ? 'Value' : Object.keys(item)[1] || Object.keys(item)[0];

    return {
      name: item[categoryKey] || 'Unknown',
      value: parseInt(item[valueKey], 10) || 0
    };
  });

  return (
    <div className="bar-chart-container">
      <h3 className="bar-chart-title">Bar Chart Visualization</h3>
      <p className="bar-chart-description">
        The bar chart below visualizes the data from your CSV file. Each bar represents a category and its corresponding value.
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
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
            dataKey="name" 
            label={{ value: 'Category', position: 'insideBottomRight', offset: -10 }}
          />
          <YAxis 
            label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="value" 
            fill="#8884d8" 
            name="Value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDisplay;

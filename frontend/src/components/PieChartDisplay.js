import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './PieChartDisplay.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#6B66FF'];

function PieChartDisplay({ data }) {
  // If no data is provided, return null
  if (!data || data.length === 0) {
    return null;
  }

  // Format data for the pie chart
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
    <div className="pie-chart-container">
      <h3 className="pie-chart-title">Data Visualization</h3>
      <p className="pie-chart-description">
        The pie chart below visualizes the data from your CSV file. Each segment represents a category and its corresponding value.
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartDisplay;

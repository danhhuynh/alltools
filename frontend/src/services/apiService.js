import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ID Generator API calls
export const generateId = async (type, prefix = '') => {
  const endpoint = `${API_BASE_URL}/id-generator/${type}${prefix ? `?prefix=${encodeURIComponent(prefix)}` : ''}`;
  const response = await axios.get(endpoint);
  return response.data;
};

// Character Counter API calls
export const countCharacters = async (text) => {
  // For shorter text, use GET endpoint with query parameter
  if (text.length < 500) {
    const response = await axios.get(`${API_BASE_URL}/character-counter/count?text=${encodeURIComponent(text)}`);
    return response.data;
  } else {
    // For longer text, use POST endpoint with request body
    const response = await axios.post(`${API_BASE_URL}/character-counter/count`, { text });
    return response.data;
  }
};

// CSV Uploader API calls
export const uploadCsv = async (file) => {
  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append('file', file);

  // Set headers for multipart/form-data
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  // Send the file to the backend
  const response = await axios.post(`${API_BASE_URL}/csv-uploader/upload`, formData, config);
  return response.data;
};

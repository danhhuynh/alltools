import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Set up axios interceptor to add auth token to requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    // Store token in localStorage
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, { email, password });
    // Store token in localStorage
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Signup failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/profile`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to get profile');
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

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

// SEO Backlink API calls
export const saveBacklink = async (backlinkData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/seo-backlink`, backlinkData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to save backlink');
  }
};

export const getBacklinks = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/seo-backlink?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to get backlinks');
  }
};

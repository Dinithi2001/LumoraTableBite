import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://localhost:8095';
const API_PREFIX = '/api/v1';
const API_URL = `${BASE_URL}${API_PREFIX}/tables`;

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 5000 // 5 second timeout
});

const tableService = {
  getAllTables: async () => {
    try {
      const endpoint = `${API_PREFIX}/tables/getall`;
      console.log('Making request to:', `${BASE_URL}${endpoint}`);
      
      const response = await api.get(endpoint);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      
      // Check if the response has the expected structure
      if (!response.data) {
        console.error('No data in response');
        throw new Error('No data received from server');
      }
      
      // Handle different possible response structures
      let tablesData;
      if (Array.isArray(response.data)) {
        tablesData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        tablesData = response.data.data;
      } else {
        console.error('Unexpected response structure:', response.data);
        throw new Error('Invalid response structure from server');
      }
      
      // Log the structure of the first table to verify fields
      if (tablesData.length > 0) {
        console.log('First table structure:', tablesData[0]);
        console.log('Available fields:', Object.keys(tablesData[0]));
      }
      
      return tablesData;
    } catch (error) {
      console.error('Error in getAllTables:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        response: error.response ? {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        } : null,
        request: error.request ? {
          method: error.request.method,
          url: error.request.url,
          headers: error.request.headers
        } : null
      });
      
      if (error.response) {
        // Server responded with an error
        throw new Error(`Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from server. Please check if the server is running.');
      } else if (error.code === 'ECONNABORTED') {
        // Request timeout
        throw new Error('Request timed out. Please check your connection.');
      } else {
        // Something happened in setting up the request
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },

  addTable: async (tableData) => {
    try {
      console.log('Adding table with data:', tableData);
      const response = await api.post(`${API_PREFIX}/tables/add`, {
        name: tableData.name
      });
      console.log('Add table response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error adding table:', error.response?.data || error.message);
      throw error;
    }
  },

  deleteTable: async (tableId) => {
    try {
      console.log('Deleting table with ID:', tableId);
      await api.delete(`${API_PREFIX}/tables/delete/${tableId}`);
    } catch (error) {
      console.error('Error deleting table:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default tableService; 